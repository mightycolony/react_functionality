import React from 'react'
import ServerDetails from './ServerDetails'
import { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';

function Forms() {
  const [formData, setFormData] = useState([]);

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
          })
          .catch((err) => {
            console.error('Error:', err.message);
          });
        }


      }

    


  return (
    <div style={{ width: '300px', padding: '20px', textAlign: 'left' }} >
        <h2>Details hae Enter Do hae!!</h2>
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
        </form>

    </div>
  )
}

export default Forms