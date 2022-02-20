export const createNode = (max_values = 3, parent = null, values = [], children = []) => ({
    max_values,
    parent,
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

export function insert(node, value){
    let {max_values} = node
    // if leaf
    if(!node.children.length){
        node.values.push(value);
        node.values.sort(); // sorts in place
        let sibling
        if(node.values.length > max_values) {
            let keep = node.values.slice(0, Math.floor(max_values / 2))
            let gift_parent = node.values.slice(Math.floor(max_values / 2), Math.floor(max_values / 2) + 1)
            let gift_sibling = node.values.slice(Math.floor(max_values / 2) + 1)
            node.values = keep
            sibling = createNode(max_values, node.parent, gift_sibling)
        }
    }



}