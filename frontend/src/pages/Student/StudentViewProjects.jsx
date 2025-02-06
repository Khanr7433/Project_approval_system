import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";

const StudentViewProjects = () => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance
          .get("/projects/getprojectbystudentid")
          .then((response) => {
            toast.success(response.data.message);
            console.log(response.data.data.projects);
            setProject(response.data.data.projects);
          });
      } catch (error) {
        toast.error("Error fetching projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {project.length > 0 ? (
        project.map((project) => (
          <Card key={project._id} className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-xl mb-4 text-center">{project.title}</h2>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <a
                href={project.synopsisFile}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                View Synopsis
              </a>
              <p className="mt-2">Status: {project.status}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div>
  );
};

export default StudentViewProjects;
