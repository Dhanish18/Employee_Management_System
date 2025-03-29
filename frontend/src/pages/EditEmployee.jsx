import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const EditEmployee = () => {
  const [preview, setPreview] = useState(null)
  const [employees, setEmployees] = useState({
      name:"",
      employee_id:"",
      department:"",
      designation:"",
      project:"",
      type:"",
      status:"",
      photo: null
  })
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{

    console.log("###########################");
    
    const employeeData = async()=>{

      try {
        const response = await axios.get(`http://localhost:8000/viewEmployee/${id}`);
        setEmployees({
      name: response.data.name || "",
      employee_id: response.data.employee_id || "",
      department: response.data.department || "",
      designation: response.data.designation || "",
      project: response.data.project || "",
      type: response.data.type || "",
      status: response.data.status || "",
      photo: response.data.photo || ""
        })
      } catch (error) {
        console.error(error)
      }
    }
    employeeData()
  }, [id])

  const handleChange = (event) => {
      const { name, value } = event.target;
      setEmployees((prev) => (
        {
          ...prev,[name] : value || ""
        }
      )) 
};

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setEmployees({
      ...employees,
      photo: file
    });
    setPreview(URL.createObjectURL(file));
  }
};

  const handleSubmit = async(event) => {
      event.preventDefault();
      try {
            await axios.put(`http://localhost:8000/updateEmployee/${id}`,employees);
            console.log('created');
            navigate('/');
      } catch (error) {
            console.error("error:",error);
      }
  }

  const handleCancel = async(event) => {  
    event.preventDefault();

          navigate('/',{ replace: true, state: {} });
}
  return (
    <div className='container'>
         <div className='border-bottom p-2'>
         <h1 className='mb-4'><MdKeyboardArrowLeft onClick={()=>navigate('/')} /> Edit Employee</h1>
         <h5 className='text-info'><IoMdPerson /> Personal Information</h5>
         </div>
          <form className='p-2 mt-2 row'>
            
          <div className="mb-3">
            {preview ? (
              <div className="mt-2">
                <img src={preview} alt="preview" width="100" height="100" className="rounded" />
              </div>
            ) : (
              <>
              <label htmlFor="photoUpload" className="bg-dark rounded" style={{height:"100px", width:"100px"}} ></label>
              <input type="file" accept="image/*" className='d-none' id="photoUpload" onChange={handlePhotoChange} />
              </>
            )}
          </div>

          <div className="col-6">
            <div className='mb-3'>
              <label className='form-label fw-bold'>Name*</label>
              <input type="text" className='form-control' placeholder="Enter name" name="name" value={employees.name} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Department*</label>
              <select name="department" className='form-control' value={employees.department} onChange={handleChange} >
                <option value="">Select Department</option>
                <option value="bca">bca</option>
                <option value="bsc">bsc</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Project</label>
              <input type="text" className='form-control' placeholder="Enter Project" name="project" value={employees.project} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Status*</label>
              <select name="status" className='form-control' value={employees.status} onChange={handleChange} >
                <option value="">Select Status</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className='mb-3'>
              <label className='form-label fw-bold'>Employee ID*</label>
              <input type="number" className='form-control'  placeholder="Enter employee ID" name="employee_id" value={employees.employee_id} onChange={handleChange} />
            </div>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Designation*</label>
              <select name="designation" className='form-control' value={employees.designation} onChange={handleChange} >
                <option value="">Select designation</option>
                <option value="developer">developer</option>
                <option value="designer">designer</option>
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label fw-bold'>Type*</label>
              <select name="type" value={employees.type} className='form-control' onChange={handleChange} >
                <option value="">Select Type</option>
                <option value="full-time">full time</option>
                <option value="part-time">part time</option>
              </select>
            </div>
            <div className='d-flex justify-content-end mt-5'>
              <button className='btn border rounded me-2' onClick={handleCancel}>Cancel</button>
              <button className='btn btn-primary' onClick={handleSubmit}>Confirm</button>
            </div>
            </div>
        </form>
        </div>
  )
}

export default EditEmployee