import React from "react";
import { IoGrid } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isEmployeePage =
    location.pathname === "/" ||
    location.pathname === "/addemployee" ||
    matchPath("/editemployee/:id", location.pathname) ||
    matchPath("/employeedetails/:id", location.pathname) ||
    matchPath("/deleteemployee/:id", location.pathname);

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: "250px" }}>
      <NavLink
        to="/"
        className="fw-bold text-info p-3 border-bottom w-100 text-decoration-none"
        style={{ fontSize: "22px" }}
      >
        RS-TECH
      </NavLink>
      <ul className="nav flex-column mt-4 pe-4">
        <li className="nav-item mb-2">
          <NavLink to="/dashboard" className="nav-link nav-link-custom">
            <IoGrid className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/"
            className={`nav-link nav-link-custom ${isEmployeePage ? "active" : ""}`}
          >
            <IoMdContacts className="me-2" /> Employee
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/calendar" className="nav-link nav-link-custom">
            <FaCalendarAlt className="me-2" /> Calendar
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/messages" className="nav-link nav-link-custom">
            <BiSolidMessageSquareDetail className="me-2 " /> Messages
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
