import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    photo: ""
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/viewEmployee/${id}`);
        if (response.data === 'employee not found') {
          navigate('/');
          return;
        }
        setEmployee({
          name: response.data.name || "",
          employee_id: response.data.employee_id || "",
          department: response.data.department || "",
          designation: response.data.designation || "",
          project: response.data.project || "",
          type: response.data.type || "",
          status: response.data.status || "",
          photo: response.data.photo || ""
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  return (
    <div className='container'>
      <div className='border-bottom p-2 position-relative'>
        <h1 className='mb-5' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <MdKeyboardArrowLeft /> View Employee Details
        </h1>
        <div className="d-inline-block border-bottom border-2 border-info position-absolute bottom-0 start-0 pb-2 px-3">
        <h5 className='text-info'><IoMdPerson /> Personal Information</h5>
        </div>
      </div>
      <form className='p-2 mt-2 row'>
      <div>
      {employee.photo ? (
            <div className='mb-3'>
              <img
                src={`http://localhost:8000/uploads/${employee.photo}`}
                alt={`${employee.name}'s Photo`}
                className="img-fluid rounded"
                style={{ Width: "100px", height: "100px" }}
              />
            </div>
          ) : (
            <div  className="bg-dark rounded mb-3" style={{height:"100px", width:"100px"}}></div>
          )}
      </div>
        <div className="col-6">
          
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Name</label>
            <p className='form-control-plaintext border-bottom'>{employee.name}</p>
          </div>
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Department</label>
            <p className='form-control-plaintext border-bottom'>{employee.department}</p>
          </div>
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Project</label>
            <p className='form-control-plaintext border-bottom'>{employee.project}</p>
          </div>
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Status</label>
            <p className='form-control-plaintext border-bottom'>{employee.status}</p>
          </div>
        </div>
        <div className="col-6">
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Employee ID</label>
            <p className='form-control-plaintext border-bottom'>{employee.employee_id}</p>
          </div>
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Designation</label>
            <p className='form-control-plaintext border-bottom'>{employee.designation}</p>
          </div>
          <div className='mb-3'>
            <label className='form-label text-muted fw-semibold'>Type</label>
            <p className='form-control-plaintext border-bottom'>{employee.type}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDetails;
