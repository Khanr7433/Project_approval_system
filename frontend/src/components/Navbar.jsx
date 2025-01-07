import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex  items-center justify-between p-4 bg-blend-color-burn text-white mx-3">
      <div className="text-2xl">
        <h1>Project Approval System</h1>
      </div>
      <div className="flex items-center gap-2">
        <ul className="flex gap-4 mx-3">
          <li>Home</li>
          <li>Projects</li>
          <li>Users</li>
        </ul>
        <Button className="px-3">Log In</Button>
        <Button className="px-3">Log Out</Button>
        <Button className="px-3">Sign Up</Button>
      </div>
    </div>
  );
};

export default Navbar;
