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
    const onButtonClick = () => {
        const d = inputRef.current.value
        // if the input is empty or this value already exists in the Btree, the button does nothing
        if(d == null || data.includes(d)) return
        const newData = [...data, d]
        setData(newData)
    }
    const arrangeNodes = () => {
        let root = createNode(3)
        data.forEach(d => {
            let leaf = search(root, d)
            insert(leaf, d)
        })
    }
    return <div>
        <input ref={inputRef} type="number"/><button onClick={onButtonClick}>click me</button>
        <div style={{width: 1300, height: 500, display:"flex", backgroundColor: "darkcyan"}}>
            {arrangeNodes()}
        </div>
    </div>
}