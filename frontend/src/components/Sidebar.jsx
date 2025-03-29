import React from "react";
import { IoGrid } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  
  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: "250px" }}>
    <Link to="/" className="fw-bold text-info p-3 border-bottom w-100 text-decoration-none" style={{ fontSize:"22px" }}>RS-TECH</Link>
      <ul className="nav flex-column mt-4 pe-4">
      <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-dark"><IoGrid className="me-2" /> Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-dark active bg-primary text-white rounded-pill rounded-start">
          <IoMdContacts className="me-2" />Employee
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-dark"><FaCalendarAlt className="me-2" />Calendar</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-dark"><BiSolidMessageSquareDetail className="me-2 " />Messages</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
