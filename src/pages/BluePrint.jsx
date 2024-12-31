import { useRef, useState } from "react";


function BluePrint() {
    const [ items , SetItems ] = useState(1)
    const [ prmvalue, SetPrmvalue ] = useState({})
    const parameterRef = useRef(null)
    const valueRef = useRef(null)
    const [ count, SetCount ] = useState(0)

    function additem() {

        const parameter = parameterRef.current?.value || "";
        const value = valueRef.current?.value || "";
        if (!(value && parameter === "")) {
            const newdict = { ...prmvalue, [count]: {[parameter]: value }}
            SetPrmvalue(newdict)
            SetItems(items+1)
            SetCount(count+1)
    }
    }
    function deleteitem(index) {
        SetItems(items-1)
        delete prmvalue[index]
        SetPrmvalue(prmvalue)
    }
    function onsubmit(){
        console.log(prmvalue)
    }
    
    return (
        <div>
                <h1>Add options to check</h1>
                {Array.from({ length: items }).map((_, index) => (
                    <div key={index}>
                            <input type="text"  ref = {parameterRef} placeholder="Enter a paramter"></input>
                            <input type="text"  ref = {valueRef} placeholder="Enter a value"></input>
                            <button onClick={additem}> &#43;</button>
                            <button onClick={() => deleteitem(index)}>&#128465;</button>
                    </div>
                ))}
            <button onClick={onsubmit}>submit</button>

        </div>
    );   

}

export default BluePrint