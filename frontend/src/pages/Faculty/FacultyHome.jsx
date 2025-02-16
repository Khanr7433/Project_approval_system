import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FacultyHome = () => {
  return (
    <div className="dark h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Faculty Panel
        <br /> Project Approval System
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/faculty/viewassignedprojects">
          <Button className="border">View assigned projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default FacultyHome;
