import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FacultyProfile = () => {
  const [facultyDetails, setFacultyDetails] = useState({});
  const [assignedProjects, setAssignedProjects] = useState([]);

  useEffect(() => {
    // Fetch faculty details and projects from an API or data source
    // Example:
    // setFacultyDetails({ name: "Jane Doe", department: "Computer Science" });
    // setProjects([{ title: "Project 1", description: "Description 1" }, { title: "Project 2", description: "Description 2" }]);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Faculty Profile</h1>
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Details</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <svg
                className="border-2 rounded-full mr-4 w-16 h-16 p-2 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="text-left pl-4">
                <p>Name: {facultyDetails.fullName}</p>
                <p>Email: {facultyDetails.email}</p>
                <p>Department: {facultyDetails.department}</p>
                <p>Designation: {facultyDetails.designation}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="outline">Update Profile</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Assigned Projects</h2>
        </CardHeader>
        <CardContent>
          {assignedProjects.length > 0 ? (
            <ul>
              {assignedProjects.map((assignedProjects, index) => (
                <li key={index} className="mb-2">
                  <h3 className="text-xl font-medium">
                    {assignedProjects.title}
                  </h3>
                  <p>{assignedProjects.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects have been Assigned.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyProfile;
