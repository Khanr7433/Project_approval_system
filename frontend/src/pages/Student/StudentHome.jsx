import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentHome = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Welcome to the Project Approval System
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/student/submit-project">
          <Button className="">Submit New Project</Button>
        </Link>
        <Link to="/student/view-projects">
          <Button className="">View Submitted Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentHome;
