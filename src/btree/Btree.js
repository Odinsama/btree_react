import {useRef, useState} from "react";
import {BtreeNode} from "./BtreeNode";
import {createNode, insert, search} from "./createNode";
/**
 * rules of b-trees:
 * the root has at least two children if it is not a leaf node
 * every node has at most m children
 * every non-leaf node (except root) has at least ceil(m/2) children
 * every non-leaf node with k children contains k-1 keys
 * all leaves must be on the same level
 * */
export let Btree = (props) => {
    const inputRef = useRef(null)
    const [data, setData] = useState(props.data) // keys in their inserted order
    const onButtonClickAdd = () => {
        const d = parseInt(inputRef.current.value)
        // if the input is empty or this value already exists in the Btree, the button does nothing
        if(d == null || data.includes(d)) return
        const newData = [...data, d]
        setData(newData)
    }
    let onButtonClickRemove = () => {
        const d = parseInt(inputRef.current.value)
        let index = data.indexOf(d)
        if(d == null || index === -1) return
        let newData = data.filter(datum => d !== datum)
        setData(newData)
    }
    let [maxValues] = useState(3)
    const arrangeNodes = () => {
        let root = createNode(maxValues)
        data.forEach(d => {
            let maybeNewRoot = insert(root, d)
            if (maybeNewRoot){
                let [value, child] = maybeNewRoot
                root = createNode(maxValues, [value], [root, child])
            }
        })
        console.log(root)
    }
    return <div>
        <input ref={inputRef} type="number"/><button onClick={onButtonClickAdd}>add</button><button onClick={onButtonClickRemove}>remove</button>
        <div style={{width: 1300, height: 500, display:"flex", backgroundColor: "darkcyan"}}>
            {arrangeNodes()}
        </div>
    </div>
}