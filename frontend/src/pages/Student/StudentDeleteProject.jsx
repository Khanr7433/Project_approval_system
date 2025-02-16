import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const deleteProjectSchema = z.object({
  projectId: z.string().nonempty("Project ID is required"),
});

const StudentDeleteProject = ({
  projectId,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}) => {
  const [errors, setErrors] = useState({});

  const handleCancel = (e) => {
    e.preventDefault();
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = deleteProjectSchema.safeParse({
      projectId,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    await axiosInstance
      .delete(`/projects/deleteproject/projectId=${projectId}`)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error("Project deletion failed");
      });

    setIsDeleteDialogOpen(false);
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
        </AlertDialogHeader>
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col gap-4">
            <AlertDialogDescription className="text-center my-1">
              <Label className="text-lg">
                Are you sure you want to delete this project?
              </Label>
            </AlertDialogDescription>
            <form className="flex flex-col gap-4 w-full">
              <div className="flex justify-center gap-4 ">
                <Button
                  onClick={handleDelete}
                  type="submit"
                  variant="outline"
                  className="w-1/2 text-red-600 hover:text-red-600"
                >
                  Delete Project
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="w-1/2"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StudentDeleteProject;
