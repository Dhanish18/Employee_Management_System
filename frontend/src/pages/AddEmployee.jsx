import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { CiCamera } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const AddEmployee = () => {
  const [preview, setPreview] = useState(null);
  const [employees, setEmployees] = useState({
    id: uuidv4(),
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    photo: null
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployees({
      ...employees,
      [name]: value
    });
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

  const validate = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const empIdRegex = /^\d{4,8}$/;
    const projectRegex = /^[A-Za-z0-9- ]{3,}$/;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  
    if (!employees.name || !nameRegex.test(employees.name)) 
      newErrors.name = "Enter a valid name (minimum 3 characters, no numbers or special characters).";
    
    if (!employees.employee_id || !empIdRegex.test(employees.employee_id)) 
      newErrors.employee_id = "Enter a valid Employee ID (4-8 digits).";
    
    if (!employees.department) 
      newErrors.department = "Select a department.";
  
    if (!employees.designation) 
      newErrors.designation = "Select a designation.";
  
    if (!employees.project || !projectRegex.test(employees.project)) 
      newErrors.project = "Enter a valid project name (min 3 characters, no special symbols).";
    
    if (!employees.status) 
      newErrors.status = "Select a status.";
  
    if (!employees.type) 
      newErrors.type = "Select employment type.";
  
    if (employees.photo) {
      if (!allowedTypes.includes(employees.photo.type)) {
        newErrors.photo = "Invalid image format. Only JPG, JPEG, PNG allowed.";
      }
      if (employees.photo.size > 2 * 1024 * 1024) {
        newErrors.photo = "Image size should be less than 2MB.";
      }
    }
  
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
      console.log('sdfsdfsd',employees.id)
    if (!validate()) return;

    const formData = new FormData();
    for (const key in employees) {
      formData.append(key, employees[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/createEmployees",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response.data, 'created');
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='container'>
      <div className='border-bottom p-2 position-relative'>
        <h1 className='mb-5'><MdKeyboardArrowLeft onClick={() => navigate('/')} /> Add new Employee</h1>
        <div className="d-inline-block border-bottom border-2 border-info position-absolute bottom-0 start-0 pb-2 px-3">
        <h5 className='text-info'><IoMdPerson /> Personal Information</h5>
        </div>
      </div>
      <form className='p-2 mt-2 row'>
        <div>
        <div className="mb-3">
            <label htmlFor="photoUpload" className="border rounded" style={{height:"100px", width:"100px", position:"relative" }} >
            {preview ? (
              <div className=" position-relative" style={{ width: "100px", height: "100px" }}>
                <img src={preview} alt="preview" className="rounded object-fit-cover w-100 h-100" />
                <span  className="position-absolute bottom-0 end-0 bg-primary p-1 rounded-circle shadow h-25 w-25 m-1  d-flex align-items-center justify-content-center" style={{ cursor: "pointer" }}><FaRegEdit  className="text-light bg-primary fs-6" /></span>
              </div>
            ) : (
              <span className='d-flex justify-content-center align-items-center w-100 h-100'><CiCamera className='fs-3' /></span>
            )}
            </label>
            <input type="file" accept="image/*" className='d-none' id="photoUpload" onChange={handlePhotoChange} />
          </div>
        </div>

        <div className="col-6">
          <div className='mb-3'>
            <label className='form-label fw-bold'>Name*</label>
            <input type="text" className='form-control' placeholder="Enter name" name="name" value={employees.name} onChange={handleChange} />
            {error.name && <p className='text-danger'>{error.name}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Department*</label>
            <select name="department" className='form-select' value={employees.department} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="Software Development">Software Development</option>
              <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="HR & Recruitment">HR & Recruitment</option>
            </select>
            {error.department && <p className='text-danger'>{error.department}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Project</label>
            <input type="text" className='form-control' placeholder="Enter Project" name="project" value={employees.project} onChange={handleChange} />
            {error.project && <p className='text-danger'>{error.project}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Status*</label>
            <select name="status" className='form-select' value={employees.status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
              <option value="Resigned">Resigned</option>
              <option value="Retired">Retired</option>
            </select>
            {error.status && <p className='text-danger'>{error.status}</p>}
          </div>
        </div>

        <div className="col-6">
          <div className='mb-3'>
            <label className='form-label fw-bold'>Employee ID*</label>
            <input type="number" className='form-control' placeholder="Enter employee ID" name="employee_id" value={employees.employee_id} onChange={handleChange} />
            {error.employee_id && <p className='text-danger'>{error.employee_id}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Designation*</label>
            <select name="designation" className='form-select' value={employees.designation} onChange={handleChange}>
              <option value="">Select Designation</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Automation Tester">Automation Tester</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Hr Manager">Hr Manager</option>
              <option value="System Administrator">System Administrator</option>
            </select>
            {error.designation && <p className='text-danger'>{error.designation}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Type*</label>
            <select name="type" value={employees.type} className='form-select' onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Full-Time">Full Time</option>
              <option value="Part-Time">Part Time</option>
              <option value="Intern">Intern</option>
              <option value="Remote">Remote</option>
            </select>
            {error.type && <p className='text-danger'>{error.type}</p>}
          </div>

          <div className='d-flex justify-content-end mt-5'>
            <button type="button" className='btn border rounded me-2' onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;