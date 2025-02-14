import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./Theme-toggle";
import { Button } from "./ui/button";
import { Logout } from "@/pages";
import { useAdmin } from "@/contexts/AdminContext";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { admin } = useAdmin();

  const adminDetails = admin;
  console.log(adminDetails);

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const adminDetails = {
  //   fullName: admin.fullName || null,
  //   email: admin.email || null,
  //   department: admin.department || null,
  //   designation: admin.designation || null,
  // };

  const isAdminPresent = adminDetails && Object.values(adminDetails) === null;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-2xl">
        <Link to="admin">
          <h1 className="font-bold">Project Approval System</h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ul className="hidden md:flex gap-4 mx-3 items-center">
          <li>
            <Link to="admin" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
          {isAdminPresent ? (
            <>
              <li>
                <Button variant="outline" onClick={handleLogoutClick}>
                  Log Out
                </Button>
                <Logout
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </li>
              <li>
                <p>{adminDetails.fullName}</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="admin/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </li>
              <li>
                <Link to="admin/register">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </li>
            </>
          )}
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
              <Link
                to="admin"
                className="hover:underline"
                onClick={toggleSidebar}
              >
                Home
              </Link>
            </li>
            {!isAdminPresent ? (
              <>
                <li>
                  <Link to="admin/login" onClick={toggleSidebar}>
                    <Button variant="outline">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link to="admin/register" onClick={toggleSidebar}>
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </li>
              </>
            ) : (
              <>
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
                  <Logout
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </li>
                <li>
                  <p>{adminDetails.fullName}</p>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
