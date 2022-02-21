export const createNode = (maxValues = 3, values = [], children = []) => ({
    maxValues,
    children,
    values,
})

export function search(node, value){
    if(!node.children.length) return node
    for (let i = 0; i < node.values.length; i++) {
        if(value < node.values[i]) return node.search(node.children[i], value)
    }
    // if the value is not smaller than (or equal to) any of our values it is greater than the greatest value
    return node.search(node.children[node.values.length], value)
}

export function remove(node, value){
    if(!node.children.length) {
        let index = node.values.indexOf(value)
        if(index === -1) return // value not found
        if(node.values.length === 1) return node // return node to indicate it should be deleted
        node.values.splice(index, 1) // remove value


    }

}

export function insert(node, value){
    let {maxValues} = node
    // if leaf
    if(!node.children.length){
        node.values.push(value);
        node.values.sort(); // sorts in place
        let sibling
        if(node.values.length > maxValues) {
            let keep = node.values.slice(0, Math.floor(maxValues / 2))
            let gift_parent = node.values.slice(Math.floor(maxValues / 2), Math.floor(maxValues / 2) + 1)
            let gift_sibling = node.values.slice(Math.floor(maxValues / 2) + 1)
            node.values = keep
            sibling = createNode(maxValues, gift_sibling)
            return [gift_parent[0], sibling]
        }
    }
    // if not leaf
    else {
        // init as rightmost child
        let correct_child = node.children[node.values.length]
        // loop left to right, break if we find a value with higher value than the one we are inserting
        for (let i = 0; i < node.values.length; i++) {
            if(value < node.values[i]) {
                correct_child = node.children[i]
                break
            }
        }
        // if we passed the whole loop without finding a value higher than the one we are inserting
        // then the initial value is valid
        let maybeResult = insert(correct_child, value)
        // if insert returned a tuple
        if (maybeResult){
            let [popped_value, newChild] = maybeResult
            let prevIndex = node.children.indexOf(correct_child);
            node.children.splice(prevIndex+1, 0, newChild) // insert new child after the node that gave us back a node when we inserted
            node.values.push(popped_value)
            node.values.sort() // sort in place
            let sibling
            if(node.values.length > maxValues) {
                let keep_values = node.values.slice(0, Math.floor(maxValues / 2))
                let keep_children = node.children.slice(0, Math.ceil(maxValues / 2))
                let parent_value = node.values.slice(Math.floor(maxValues / 2), Math.floor(maxValues / 2) + 1)[0]
                let sibling_values = node.values.slice(Math.floor(maxValues / 2) + 1)
                let sibling_children = node.children.slice(Math.ceil(maxValues / 2) + 1)
                node.values = keep_values
                node.children = keep_children
                sibling = createNode(maxValues, sibling_values, sibling_children)
                return [parent_value, sibling]
            }
        }


    }
}