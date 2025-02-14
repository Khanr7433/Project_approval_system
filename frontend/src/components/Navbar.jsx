import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./Theme-toggle";
import { Button } from "./ui/button";
import StudentLogout from "@/pages/Student/StudentLogout";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-2xl">
        <Link to="">
          <h1 className="font-bold">Project Approval System</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ul className="hidden md:flex gap-4 mx-3 items-center">
          <li>
            <Link to="" className="hover:underline">
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
            <Button variant="outline" onClick={handleLogoutClick}>
              Log Out
            </Button>
            <StudentLogout
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </li>
        </ul>
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <button onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex flex-col items-center justify-center md:hidden">
          <button className="absolute top-4 right-4" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="flex flex-col gap-4 items-center">
            <li>
              <Link to="" className="hover:underline" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="student/login" onClick={toggleSidebar}>
                <Button variant="outline">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="student/register" onClick={toggleSidebar}>
                <Button variant="outline">Sign Up</Button>
              </Link>
            </li>
            <li>
              <Button
                variant="outline"
                onClick={() => {
                  handleLogoutClick();
                  toggleSidebar();
                }}
              >
                Log Out
              </Button>
              <StudentLogout
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
