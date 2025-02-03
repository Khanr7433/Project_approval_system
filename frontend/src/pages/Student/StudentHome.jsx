import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentHome = () => {
  return (
    <div className="dark h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">
        Welcome to the Student Panel
        <br /> Project Approval System
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
