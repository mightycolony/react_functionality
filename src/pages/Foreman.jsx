import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
const Foreman = () => {
    const [inv, setInv] = useState(null)
    const [newinv, setNewinv] =   useState(inv)
  
    useEffect(() => {
      fetch('http://localhost:8080/list_update_foreman_inv', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setInv(data)
          setNewinv(data)
        })
    }, [])

    const columns = [
        {
            name: "ID",
            selector: row => row.org_id,
            sortable: true
        },
        {
            name: "Cert_Name",
            selector: row => row.name
        },
        {
            name: "IP",
            selector: row => row.ip
        },
        {
            name: "Hostgroup_ID",
            selector: row => row.hostgroup_id
        },
        {
          name: "Hostgroup_NAME",
          selector: row => row.hostgroup_name
      },
        {
          name: "Class",
          selector: row => row.classes,
          cell: row => (
            <div style={{ whiteSpace: 'pre-line' }}>
              {row.classes}
            </div>
          ),
        },

    ];
    const handleSearch = (e) => {
      const searchValue = e.target.value;


      const newRows = inv.filter((row) => {
        return row.ip.includes(searchValue);
      
    })
      setNewinv(newRows)
  }
  return (
    
    <div >
      <input type="search" placeholder="Search IP" onChange={(e) => handleSearch(e)}/>
      <DataTable 
          columns={columns} 
          data={newinv || []} 
          fixedHeader
          title="Foreman Inventory"
          pagination
          selectableRows

      />
    </div>

  )
}

export default Foreman