import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex  items-center justify-between p-4 bg-blend-color-burn text-white mx-3">
      <div className="text-2xl">
        <h1>Project Approval System</h1>
      </div>
      <div className="flex items-center gap-2">
        <ul className="flex gap-4 mx-3">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>Projects</li>
          <li>Users</li>
        </ul>
        <Link to="login" className="px-3">
          Log In
        </Link>
        <Link to="register" className="px-3">
          Sign Up
        </Link>
        <Link to="Logout" className="px-3">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
