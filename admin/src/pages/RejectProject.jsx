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
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/utils/axiosInstance";

const rejectProjectSchema = z.object({
  projectId: z.string().nonempty("Project is required"),
  rejectionCause: z.string().nonempty("Rejection cause is required"),
});

const RejectProject = ({
  projectId,
  isRejectDialogOpen,
  setIsRejectDialogOpen,
}) => {
  const [rejectionCause, setRejectionCause] = useState("");
  const [errors, setErrors] = useState({});

  const handleCancel = (e) => {
    e.preventDefault();
    setRejectionCause("");
    setIsRejectDialogOpen(false);
  };

  const handleReject = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = rejectProjectSchema.safeParse({
      projectId,
      rejectionCause,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    await axiosInstance
      .patch(`/projects/rejectproject/projectId=${projectId}`)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.success("Project rejected successfully");
      });

    setRejectionCause("");
    setIsRejectDialogOpen(false);
  };

  return (
    <AlertDialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Project</AlertDialogTitle>
        </AlertDialogHeader>
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col gap-4">
            <AlertDialogDescription className="text-center my-1">
              <Label>Please provide a reason for rejecting the project</Label>
            </AlertDialogDescription>
            <form className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="rejectionCause"
                  id="rejectionCause"
                  className="my-1"
                >
                  Rejection Cause
                </Label>
                <Textarea
                  value={rejectionCause}
                  onChange={(e) => setRejectionCause(e.target.value)}
                  id="rejectionCause"
                  rows="2"
                  placeholder="Enter project's rejection cause"
                  className="border rounded p-2"
                />
                {errors.rejectionCause && (
                  <p className="text-red-600">
                    {errors.rejectionCause._errors[0]}
                  </p>
                )}
              </div>
              <div className="flex justify-center gap-4 ">
                <Button
                  onClick={handleReject}
                  type="submit"
                  variant="outline"
                  className="w-1/2 text-red-600 hover:text-red-600"
                >
                  Reject Project
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

export default RejectProject;
