import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import ApproveProject from "./ApproveProject";
import { use } from "react";
import { RejectProject } from ".";

const ViewSubmittedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("projects/getprojects");
        setProjects(response.data.data.projects);
      } catch (error) {
        toast.error("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  const handleApproveProject = (projectId) => {
    setProjectId(projectId);
    setIsApproveDialogOpen(true);
  };

  const handleRejectProject = async (projectId) => {
    setProjectId(projectId);
    setIsRejectDialogOpen(true);
  };

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <h1 className="text-3xl mb-4">Submitted Projects</h1>
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
                      <strong>Title :</strong>
                      {project.title}
                    </p>
                    <p>
                      <strong>Description :</strong> {project.description}
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

                    <Button
                      onClick={() => {
                        handleApproveProject(project._id);
                      }}
                      variant="outline"
                      className="text-green-600 hover:text-green-600"
                    >
                      Approve
                    </Button>

                    <Button
                      onClick={() => {
                        handleRejectProject(project._id);
                      }}
                      variant="outline"
                      className="text-red-600 hover:text-red-600"
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
      <ApproveProject
        projectId={projectId}
        isApproveDialogOpen={isApproveDialogOpen}
        setIsApproveDialogOpen={setIsApproveDialogOpen}
      />
      <RejectProject
        projectId={projectId}
        isRejectDialogOpen={isRejectDialogOpen}
        setIsRejectDialogOpen={setIsRejectDialogOpen}
      />
    </div>
  );
};

export default ViewSubmittedProjects;
