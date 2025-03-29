import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const AddEmployee = () => {
  const [preview, setPreview] = useState(null);
  const [employees, setEmployees] = useState({
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
    if (!employees.name) newErrors.name = "Enter valid name";
    if (!employees.department) newErrors.department = "Enter valid department";
    if (!employees.employee_id) newErrors.employee_id = "Enter valid employee ID";
    if (!employees.designation) newErrors.designation = "Enter valid designation";
    if (!employees.project) newErrors.project = "Enter valid project";
    if (!employees.status) newErrors.status = "Select status";
    if (!employees.type) newErrors.type = "Enter valid type";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      <div className='border-bottom p-2'>
        <h1 className='mb-4'><MdKeyboardArrowLeft onClick={() => navigate('/')} /> Add new Employee</h1>
        <h5 className='text-info'><IoMdPerson /> Personal Information</h5>
      </div>
      <form className='p-2 mt-2 row'>
        <div className="col-6">
          <div className="mb-3">
            <label htmlFor="photoUpload" className="bg-dark rounded" style={{height:"100px", width:"100px"}} ></label>
            <input type="file" accept="image/*" className='d-none' id="photoUpload" onChange={handlePhotoChange} />
            {preview && (
              <div className="mt-2">
                <img src={preview} alt="preview" width="100" height="100" className="rounded" />
              </div>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Name*</label>
            <input type="text" className='form-control' placeholder="Enter name" name="name" value={employees.name} onChange={handleChange} />
            {error.name && <p className='text-danger'>{error.name}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Department*</label>
            <select name="department" className='form-control' value={employees.department} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="bca">BCA</option>
              <option value="bsc">BSC</option>
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
            <select name="status" className='form-control' value={employees.status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
            <select name="designation" className='form-control' value={employees.designation} onChange={handleChange}>
              <option value="">Select Designation</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
            </select>
            {error.designation && <p className='text-danger'>{error.designation}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label fw-bold'>Type*</label>
            <select name="type" value={employees.type} className='form-control' onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
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