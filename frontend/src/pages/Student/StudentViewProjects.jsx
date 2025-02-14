import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";

const StudentViewProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get(
          "/projects/getprojectbystudentid"
        );
        setProjects(response.data.data.projects);
      } catch (error) {
        toast.error("Error fetching projects");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <h1 className="text-3xl mb-4">Projects</h1>
        </CardHeader>
        <CardContent>
          {projects && projects.length === 0 ? (
            <p>No projects available</p>
          ) : (
            projects &&
            projects.map((project) => (
              <Card key={project._id} className="mb-4">
                <CardHeader>
                  <h2 className="text-xl mb-4">
                    <strong>Title : </strong>
                    {project.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Description : </strong>
                    {project.description}
                  </p>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentViewProjects;
