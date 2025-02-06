import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StudentHome = () => {
  return (
    <div className="dark min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Student Panel
        <br /> Project Approval System
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/student/submitproject">
          <Button className="border">Submit New Project</Button>
        </Link>
        <Link to="/student/viewproject">
          <Button className="border">View Submitted Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentHome;
