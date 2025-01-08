import { useEffect, useState } from 'react'
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import 'font-awesome/css/font-awesome.min.css';
const Foreman_render = () => {
    const [hostgroup_name, Sethostgroup_name] = useState("")
    const [class_in_hstgrp, Setclass_in_hstgrp] = useState([])
    const [totalclass, Settotalclass] = useState([])
    const ip = "192.168.1.3"
  
    useEffect(() => {
      fetch(`http://localhost:8080/list_host_for_a_hostgroup/${ip}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
            if (data === null) {
                Sethostgroup_name(" ")
            }
            else{
                Sethostgroup_name(data)
            }

        })
    }, [])//add ip variable here once the IP changes it should reflect
    useEffect(() => {
      if (!hostgroup_name || hostgroup_name.trim() === "") return;
    
      fetch(`http://localhost:8080/list_hostgroups/${hostgroup_name}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          Setclass_in_hstgrp(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [hostgroup_name]);

  
    useEffect(() => {
        fetch("http://localhost:8080/list_classes", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
                Settotalclass(data)
                
  
          })
      }, [])

        
 return (
    <>
        <div>
        <label style={{margin: "10px" }}>Hostgroup for the IP: {hostgroup_name} </label>

        </div>
        <div>
        <DualListBox
            options={totalclass}
            selected={class_in_hstgrp}
            onChange={(newValue) => Setclass_in_hstgrp(newValue)}
            //total class is not store after change
            canFilter
        />
        </div>

            
    </>
);


}
export default Foreman_render;