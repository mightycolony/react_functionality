import { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import "./navbar.css"

function ServerDetails({onDataChange}) {

  const [ips, setIps] = useState([]);
  const [newIP, setnewIP] = useState([]);
  const [secList, setSecList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/list_servers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          const formattedData = data.map((item) => ({
            id: item.id, // unique identifier
            name: `${item.ip} - ${item.os_name}`, // Display value
          }));
          setIps(formattedData);
          
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  useEffect(() => {
    if (onDataChange) {
    onDataChange(secList)
    }
  },[secList])

    const [isVisible, setIsVisible] = useState(false);
    function handleclickvisible() {
      setIsVisible(!isVisible)
    }

    function Onadd() {
      console.log(newIP)
      fetch('http://localhost:8080/server_addition', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          os_name: 'Custom OS',
          ip: newIP, 
        }),

        
        
      })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err.message);
     });
       
        }    



    function Ondelete() {
      secList.map( (slist) => {
        fetch('http://localhost:8080/server_removal', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: slist.id, 
          }),

        })
        .then((response) => response.json())
        .then(() => {
          setIps((prevIps) => prevIps.filter((item) => item.id !== slist.id));
          setSecList((prevSecList) => prevSecList.filter((item) => item.id !== slist.id));

        })
        .catch((err) => {
          console.log(err.message);
          
       });  
      } )



    }
    return (
        <div style={{ width: '300px', padding: '0px', textAlign: 'left' }}>
        <h3 >Select Options</h3>
       
        <Multiselect
          options={ips}
          displayValue="name" 
          placeholder="Select"
          selectedValues={secList}
          onSelect={(selectedList, selectedItem) =>
            setSecList(selectedList)
          } 
          onRemove={(selectedList, removedItem) =>
            setSecList(selectedList)

            
          }
          style={{
            chips: { background: '#00bcd4' },
            searchBox: { border: '1px solid #00bcd4' },
          }}
        />
        <button  onClick={handleclickvisible} style={{ marginTop: '10px' }}>
        Add New Option
      </button>
      {isVisible && (
        <form>
          <input id="ip_address" tpye="string" placeholder='ip address' onChange={(e) => setnewIP(e.target.value)}></input>
          
          <button onClick={Onadd} type="submit">Submit</button>
        </form>
      )}

      <button  onClick={ Ondelete} type="submit" style={{ marginTop: '10px' }}>
        Delete Option
      </button>
      </div>

      

    )

    


    
  }
  
  export default ServerDetails
  