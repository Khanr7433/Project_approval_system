import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="dark min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to the Project Approval System
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/student/login">
          <Button className="border">Student Login</Button>
        </Link>
        <Link to="/faculty/login">
          <Button className="border">Faculty Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
