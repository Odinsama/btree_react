export let BtreeNode = ({values, max}) => {
    let inputs = []
    for (let i = 0; i < values.length; i++) {
        inputs.push(<input style={{width: 30}} value={values[i]} readOnly/>)
    }
    for (let i = 0; i < max - values.length; i++) {
        inputs.push(<input style={{width: 30}} readOnly/>)
    }
    return <div style={{width: 130, height: 500, backgroundColor: "lightgrey"}}>
        {inputs}
    </div>
}