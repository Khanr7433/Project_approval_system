import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const ViewApprovedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      await axiosInstance
        .get("/projects/getapprovedprojects")
        .then((response) => {
          setProjects(response.data.data.projects);
        })
        .catch((error) => {
          toast.error("Failed to fetch projects");
        });
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <h1 className="text-3xl mb-4">Approved Projects</h1>
        </CardHeader>
        <CardContent>
          {projects && projects.length === 0 ? (
            <p>No projects available</p>
          ) : (
            projects &&
            projects.map((project) => (
              <Card key={project._id} className="mb-4">
                <CardHeader>
                  <p>
                    <strong>Team Members : </strong>
                    {project.byStudent && project.byStudent.length > 0
                      ? project.byStudent
                          .map((student) => (
                            <span key={student._id}>{student.fullName}</span>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "No team members"}
                  </p>
                </CardHeader>
                <CardContent>
                  <div>
                    <p>
                      <strong>Title : </strong>
                      {project.title}
                    </p>
                    <p>
                      <strong>Description :</strong> {project.description}
                    </p>
                    <p>
                      <strong>Guide :</strong> {project.guide.fullName}
                    </p>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <Button
                      onClick={() =>
                        window.open(
                          project.synopsis,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      variant="outline"
                    >
                      View Synopsis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewApprovedProjects;
