import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <div className="p-3 border-bottom d-flex justify-content-end align-items-center">
      <div className="d-flex align-items-center gap-3">
      <div className="bg-light p-1 rounded-circle">
      <CiSettings className="fs-4 text-dark cursor-pointer" />
      </div>
      <div className="bg-light p-1 rounded-circle">
        <IoIosNotificationsOutline className="fs-4 text-dark cursor-pointer" />
      </div>
        <div className="bg-dark rounded-circle" style={{ width: "30px", height: "30px" }}></div>
      </div>
    </div>
  );
};

export default Header;
