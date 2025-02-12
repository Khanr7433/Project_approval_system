import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudent } from "@/contexts/StudentContext";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const StudentProfile = () => {
  const { student } = useStudent();
  const { fullName, rollNo, email, year, department } = student;
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      await axiosInstance
        .get("/projects/getprojectbystudentid")
        .then((response) => {
          toast.success(response.data.message);
          setProject(response.data.data.projects);
        })
        .catch((error) => {
          toast.error("Error fetching projects");
        });
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Profile</h1>
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Details</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <svg
                className="border-2 rounded-full mr-4 w-16 h-16 p-2  -left-1"
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
                <p>Name : {fullName}</p>
                <p>Roll No : {rollNo}</p>
                <p>Email : {email}</p>
                <p>Academic Year : {year}</p>
                <p>Department : {department}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {/* update profile  */}
              <Button variant="outline">Update Profile</Button>
              {/* change password */}
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold">Submitted Projects</h2>
        </CardHeader>
        <CardContent>
          {project.length > 0 ? (
            <ul>
              {project.map((project, index) => (
                <Card key={index} className="mb-2">
                  <CardHeader>
                    <h3 className="text-xl font-medium">
                      Title : {project.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="text-sm">
                      Description : {project.description}
                    </p>
                    <p className="text-sm">
                      Team Members : {project.byStudent}
                    </p>

                    <div className="flex flex-row gap-6 mb-1">
                      <p className="text-sm">
                        Submitted On :{" "}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm">Status : {project.status}</p>
                    </div>

                    {project.status === "Approved" && (
                      <p className="text-sm">Guide : {project.guide}</p>
                    )}

                    <div className="flex flex-row gap-4">
                      <Button variant="outline">View Synopsis</Button>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:text-red-600"
                      >
                        Delete Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </ul>
          ) : (
            <p>No projects have been submitted.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
