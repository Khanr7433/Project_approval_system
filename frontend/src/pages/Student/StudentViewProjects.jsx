import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { StudentDeleteProject } from ".";

const StudentViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);

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

  const HandleDeleteProject = (projectId) => {
    setProjectId(projectId);
    setIsDeleteDialogOpen(true);
  };

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
                  <p className="mt-2">Status: {project.status}</p>
                  <Button
                    onClick={() =>
                      window.open(
                        project.synopsis,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    variant="outline"
                    className="mt-4"
                  >
                    View Synopsis
                  </Button>
                  <Button
                    onClick={() => HandleDeleteProject(project._id)}
                    variant="outline"
                    className="mt-4 ml-4 text-red-600 hover:text-red-600"
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
      <StudentDeleteProject
        projectId={projectId}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
    </div>
  );
};

export default StudentViewProjects;
