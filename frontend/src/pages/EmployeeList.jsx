import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteEmployee from "../pages/DeleteEmployee";

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]) 
  const [deleteClicked, setDeleteClicked] = useState(false)

  useEffect(()=>{
      axios.get('http://localhost:8000/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error:" , err))
  }, [])


  const handleSearch = async (e) => {
    const response = await axios.post(`http://localhost:8000/searchEmployee?value=${e.target.value}`)
    if(response.data){
      setEmployees(response.data)
    }
    
  }
  return (
    <>
      {
      deleteClicked ? ( <DeleteEmployee /> ) : (
<div className="container p-3">
      <div className="row">
      <div className='col'>
        <h2>Employee</h2>
      </div>
      <div className='col d-flex align-items-center gap-2'>
        <div className="position-relative w-50">
          <CiSearch className='position-absolute fs-4 top-50 start-0 translate-middle-y ms-3 text-secondary' />
          <input type="text" className='form-control ps-5' placeholder='Search' onChange={handleSearch} />
        </div>
        <Link to="/addemployee" className='btn btn-primary w-50 text-start'>
          <CiCirclePlus className='mx-3 fs-4'/>Add New Employee
        </Link>
        </div>
      </div>

    <div className="table-responsive border rounded mt-4 px-3">
      <table className="table mb-0">
        <thead>
          <tr>
            <th className='text-muted'>Employee Name</th>
            <th className='text-muted'>Employee ID</th>
            <th className='text-muted'>Department</th>
            <th className='text-muted'>Designation</th>
            <th className='text-muted'>Project</th>
            <th className='text-muted'>Type</th>
            <th className='text-muted'>Status</th>
            <th className='text-muted'>Action</th>
          </tr>
        </thead>
        <tbody>
        {employees.length > 0 ? (
          employees.map((emp) =>(
          <tr key={emp.id}>
          <td style={{ verticalAlign: "middle" }}>
          <div className="d-flex align-items-center">
          {emp.photo ? (
          <img
            src={`http://localhost:8000/uploads/${emp.photo}`}
            alt="Employee photo"
            className="rounded-circle me-2"
            style={{ height: "30px", width: "30px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="rounded-circle bg-dark me-2"
            style={{ height: "30px", width: "30px"}}
          ></div>
        )}
           <span>{emp.name}</span>
           </div>
           </td>
          <td style={{ verticalAlign: 'middle'}}>{emp.employee_id}</td>
          <td style={{ verticalAlign: 'middle'}}>{emp.department}</td>
          <td style={{ verticalAlign: 'middle'}}>{emp.designation}</td>
          <td style={{ verticalAlign: 'middle'}}>{emp.project}</td>
          <td style={{ verticalAlign: 'middle'}}>{emp.type}</td>
          <td style={{ verticalAlign: 'middle'}}>{emp.status}</td>
          <td>
            <Link to={`/employeedetails/${emp.id}`} className='icon-link me-2 '><IoEyeOutline className='fs-4' /></Link>
            <Link to={`/editemployee/${emp.id}`} className='icon-link me-2'><CiEdit className='fs-4' /></Link>
            <Link to={`/deleteemployee/${emp.id}`} onClick={()=>setDeleteClicked(true)} className='icon-link '><RiDeleteBin6Line className='fs-4' /></Link>
          </td>
          </tr>
        )) ): (
          <tr>
            <td className='fw-bold text-center py-5' colSpan='100%'>No records found</td>
          </tr>
         )}
        </tbody>
      </table>
    </div>
    
  </div>
      )
    }
    </>
  )
}

export default EmployeeList