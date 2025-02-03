import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./Theme-toggle";

const Navbar = () => {
  return (
    <div className="flex  items-center justify-between p-4 bg-blend-color-burn text-white mx-3">
      <div className="text-2xl">
        <h1>Project Approval System</h1>
      </div>
      <div className="flex items-center gap-2">
        <ul className="flex gap-4 mx-3 items-center ">
          <li>
            <ModeToggle />
          </li>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="student/login" className="px-3">
              Log In
            </Link>
          </li>
          <li>
            {" "}
            <Link to="student/register" className="px-3">
              Sign Up
            </Link>
          </li>
          <li>
            <Link to="student/Logout" className="px-3">
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
