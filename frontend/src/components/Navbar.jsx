import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./Theme-toggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 ">
      <div className="text-2xl">
        <Link to="">
          <h1 className="font-bold">Project Approval System</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ul className="flex gap-4 mx-3 items-center">
          <li>
            <Link to="" className="hover:underline ">
              Home
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <Link to="student/login">
              <Button variant="outline">Login</Button>
            </Link>
          </li>
          <li>
            <Link to="student/register">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </li>
          <li>
            <Link to="student/Logout">
              <Button variant="outline">Log Out</Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
