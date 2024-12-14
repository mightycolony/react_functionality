import React, { useState, useEffect } from 'react'

const KernelSpace = () => {
    const [funcs, setFuncs] = useState([])
    const[fsname, setFsname ] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/kernelspace_list', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
           .then((response) => response.json())
           .then((data) => {

              const splitKey = []
              const entriesArray = Object.entries(data).map(([key, value]) => {
                  splitKey.push(key)            
          });
            setFsname(splitKey)
                const newDict={}
                const valueArray = Object.entries(data).map(([key, value]) => {
                    let nameValue = value.function_name;
                    let funValue = value.function_content;
                    newDict[nameValue] = funValue ;
                    

                })
                setFuncs(newDict)
           })
           .catch((err) => {
              console.log(err.message);
           });
           
     }, []);


     const [functionvalue, setFunctionValue] = useState(null)
     const [showContent, setShowContent] = useState(false);
     const [position, setPosition] = useState({})
     const showfncontent = (e) => {

         const fnames=e.target.innerText
        console.log(fsname)
        console.log(funcs)
        setShowContent(true);
        setFunctionValue(funcs[fnames])
        setPosition({
          top: e.clientX + 10,
          left: e.clientY + 10,
        })

     }
     const handleMouseOut = () => {
         setShowContent(false);
     };

    



  return (
    <div style={{width: '100px'}}>
        <p className='function_titile'>Functions List</p>   
     {fsname.map((item) => (

    <ul key={item}>
        <li className='funcs' onMouseOver={(e) => showfncontent(e)} > 
            {item}    
        </li>
    </ul>
    ))} 


    {showContent && (
        <div className='popup'
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            backgroundColor: 'white',
            border: '2px solid #ccc',
            borderRadius: '12px',
            padding: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 10, 
            width: 'auto',
            fontWeight: 'bold', 
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            cursor: 'pointer', 
            
          }}
        >
          <a    style={{
            color: 'black',
            fontSize: '30px',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 200ms'
          }} 
      onClick={handleMouseOut} href="#">&times;</a>
          <p style={{ color: 'blue',overflow: 'auto' } }>{functionvalue}</p>
        </div>
      )}
    </div>
    



  )
}

export default KernelSpace