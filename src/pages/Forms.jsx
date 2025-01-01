import React, { Component } from 'react'
import ServerDetails from './ServerDetails'
import { useState, useEffect, useRef } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router-dom';


function Forms() {
  const [formData, setFormData] = useState([]);
  const [popupcontent, setPopupContent] = useState({});
  const [showpopupcontent, SetShowPopupContent] = useState(false)



  const handleDataChange = (data) => {
    const  ipaddress=[]
    const entriesArrayip = Object.entries(data).map(([key, value]) => {
      ipaddress.push(value.name)
    })
    setFormData(ipaddress); 
  };

  const [funcsshow, setFuncSshow] = useState([])
  const [selectedkspace, setSelectedkspace] = useState("")
  useEffect(() => {
      fetch('http://localhost:8080/kernelspace_list', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
         .then((response) => response.json())
         .then((data) => {
          let keys = Object.values(data);
          setFuncSshow(keys);


         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);


  function onSumbit(e) {
      e.preventDefault();
      const  selectedfuns=[]
      const entriesArray = Object.entries(selectedkspace).map(([key, value]) => {
        selectedfuns.push(value.function_name)
      }) 
      console.log(selectedfuns)
      console.log(formData)
        if (selectedfuns.length > 0 && formData) {
          fetch('http://localhost:8080/execute_action', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              function: selectedfuns, 
              ip_os_details: formData
            }),
        
          })
          .then((response) => response.json())
          .then((data) => {
            console.log('Response:', data);
            setPopupContent(data)
            SetShowPopupContent(true)
      
          })
          .catch((err) => {
            console.error('Error:', err.message);
          });
          console.log(typeof popupcontent)

        }

      }

      function onremove() {
        SetShowPopupContent(false)
      }

  // function onNext(e){
  //     e.preventDefault()
  //     navigate("/BluePrint")
  //     console.log("onNext")
  // }
  // ---------blueprint--------------
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

  // ---------------------------

  return (
    <div style={{ width: '500px', padding: '20px', textAlign: 'left' }} >
        <h2>Enter User and kernel space function</h2>
        <ServerDetails onDataChange={handleDataChange} />
        <form>
                    
                    <h3 >Select Kernelspace functions</h3>
                    <Multiselect
                    options={funcsshow}
                    displayValue="function_name"
                    placeholder="Select"
                    onSelect={(selectedList, selectedItem) =>
                      setSelectedkspace(selectedList)
                    } 
                    onRemove={(selectedList, removedItem) =>
                      setSelectedkspace(selectedList)
          
                      
                    }

                    style={{
                      width: 100,
                      chips: { background: '#00bcd4' },
                      searchBox: { border: '1px solid #00bcd4' },
                    }}
                  />
                    <h3 >Select Userspace functions</h3>
                    <Multiselect
                    options={funcsshow}
                    displayValue="function_name"
                    placeholder="Select"

                    style={{
                      width: 100,
                      chips: { background: '#00bcd4' },
                      searchBox: { border: '1px solid #00bcd4' },
                    }}
                  />
                   <button onClick={(e) => onSumbit(e)}>Submit</button> 
                   {/* <button onClick={ (e) => onNext(e)}>Next</button> */}

                 
        </form>
   
            {showpopupcontent && (
            <div style={{
              position: 'absolute',
              top: '200px',
              left: '500px',
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
              
            }}>
              <a onClick={onremove} href="#">&times;</a>
              {Object.entries(popupcontent).map(([key, value]) => (
                <ul key={key}>

                      <p>IP Address: {key}</p>
                      {Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <div key={nestedKey}>
                            <p >{nestedKey}</p>
                            {Object.entries(nestedValue).map(([secnestedKey, secnestedValue]) => (
                                   <p key={secnestedKey}>{secnestedKey}{secnestedValue}</p>

                            ))}
                          </div>
                      ))}
                       
                </ul>
              ))}
              
            </div>
             
          )}
  
    </div>


  )
}

export default Forms