import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";

const EditEmployee = () => {
  const [preview, setPreview] = useState(null);
  const [employees, setEmployees] = useState({
    name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    photo: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
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
          photo: response.data.photo || null,
        });

        if (response.data.photo) {
          setPreview(`http://localhost:8000/uploads/${response.data.photo}`); 
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployees((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployees({
        ...employees,
        photo: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", employees.name);
      formData.append("employee_id", employees.employee_id);
      formData.append("department", employees.department);
      formData.append("designation", employees.designation);
      formData.append("project", employees.project);
      formData.append("type", employees.type);
      formData.append("status", employees.status);
      if (employees.photo) {
        formData.append("photo", employees.photo); 
      }

      await axios.put(`http://localhost:8000/updateEmployee/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/", { replace: true, state: {} });
  };

  return (
    <div className="container">
      <div className="border-bottom p-2 position-relative">
        <h1 className="mb-5">
          <MdKeyboardArrowLeft onClick={() => navigate("/")} /> Edit Employee
        </h1>
        <div className="d-inline-block border-bottom border-2 border-info position-absolute bottom-0 start-0 pb-2 px-3">
        <h5 className="text-info">
          <IoMdPerson /> Personal Information
        </h5>
        </div>
      </div>
      <form className="p-2 mt-2 row">
        <div className="mb-3">
          <label
            htmlFor="photoUpload"
            className="border rounded d-flex align-items-center justify-content-center"
            style={{ height: "100px", width: "100px", position: "relative", cursor: "pointer" }}
          >
            {preview ? (
              <div className="position-relative" style={{ width: "100px", height: "100px" }}>
                <img src={preview} alt="preview" className="rounded object-fit-cover w-100 h-100" />
                <span className="position-absolute bottom-0 end-0 bg-primary p-1 rounded-circle shadow h-25 w-25 m-1 d-flex align-items-center justify-content-center">
                  <FaRegEdit className="text-light bg-primary fs-6" />
                </span>
              </div>
            ) : (
              <CiCamera className="fs-3" />
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            className="d-none"
            id="photoUpload"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="col-6">
          <div className="mb-3">
            <label className="form-label fw-bold">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={employees.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Department*</label>
            <select name="department" className="form-select" value={employees.department} onChange={handleChange}>
            <option value="">Select Department</option>
              <option value="Software Development">Software Development</option>
              <option value="Quality Assurance (QA)">Quality Assurance (QA)</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="HR & Recruitment">HR & Recruitment</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Project</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Project"
              name="project"
              value={employees.project}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Status*</label>
            <select name="status" className="form-select" value={employees.status} onChange={handleChange}>
            <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
              <option value="Resigned">Resigned</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>

        <div className="col-6">
          <div className="mb-3">
            <label className="form-label fw-bold">Employee ID*</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter employee ID"
              name="employee_id"
              value={employees.employee_id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Designation*</label>
            <select name="designation" className="form-select" value={employees.designation} onChange={handleChange}>
            <option value="">Select Designation</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Automation Tester">Automation Tester</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Hr Manager">Hr Manager</option>
              <option value="System Administrator">System Administrator</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Type*</label>
            <select name="type" value={employees.type} className="form-select" onChange={handleChange}>
            <option value="">Select Type</option>
              <option value="Full-Time">Full Time</option>
              <option value="Part-Time">Part Time</option>
              <option value="Intern">Intern</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div className="d-flex justify-content-end mt-5">
            <button className="btn border rounded me-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
