import { useState, useEffect } from 'react'
function ServerDetails() {
  const [ips, setIps] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/list_servers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setIps(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

    const [isVisible, setIsVisible] = useState(false);
    function handleclickvisible() {
      setIsVisible(!isVisible)
    }

    return (
      
        <div>
          <button onClick={handleclickvisible}>Server</button>
          <select className={isVisible ? 'visible' : 'hidden'}>
            {ips.map((ip) => (
              <option key={ip.id} value={ip.ip}>
                {ip.ip} {ip.os_name}
              </option>
            ))}
          </select>
        </div>

    )
  }
  
  export default ServerDetails
  