import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const approveProjectSchema = z.object({
  projectId: z.string().nonempty("Project is required"),
  guideId: z.string().nonempty("Guide is required"),
});

const ApproveProject = ({
  projectId,
  isApproveDialogOpen,
  setIsApproveDialogOpen,
}) => {
  const [guideId, setGuideId] = useState("");
  const [guides, setGuides] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGuides = async () => {
      await axiosInstance
        .get("/admin/getguides")
        .then((response) => {
          setGuides(response.data.data.guides);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    fetchGuides();
  }, []);

  const handleCancel = (e) => {
    e.preventDefault();
    setGuideId("");
    setIsApproveDialogOpen(false);
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = approveProjectSchema.safeParse({
      projectId,
      guideId,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    await axiosInstance
      .patch(`/projects/approveproject/projectId=${projectId}`)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error("Approval failed");
      });

    await axiosInstance
      .patch("/admin/assignguide", {
        guideId,
        projectId,
      })
      .then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Guide assignment failed");
      });

    setGuideId("");
    setIsApproveDialogOpen(false);
  };

  return (
    <AlertDialog
      open={isApproveDialogOpen}
      onOpenChange={setIsApproveDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Project</AlertDialogTitle>
        </AlertDialogHeader>
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col gap-4">
            <AlertDialogDescription className="text-center my-1">
              <Label>Please select a guide to approve the project</Label>
            </AlertDialogDescription>
            <form className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-4">
                <Label htmlFor="guideId" id="guideId" className="my-1">
                  Guide Name
                </Label>
                <Select
                  onValueChange={(value) => setGuideId(value)}
                  value={guideId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Guide" />
                  </SelectTrigger>
                  {guides ? (
                    guides.map((guide) => (
                      <SelectContent key={guide._id}>
                        <SelectItem key={guide._id} value={guide._id}>
                          {guide.fullName} ({guide.numberOfProjects} projects)
                        </SelectItem>
                      </SelectContent>
                    ))
                  ) : (
                    <p> No guide Available </p>
                  )}
                </Select>

                {errors.guideId && (
                  <p className="text-red-600">{errors.guideId._errors[0]}</p>
                )}
              </div>
              <div className="flex justify-center gap-4 ">
                <Button
                  onClick={handleApprove}
                  type="submit"
                  variant="outline"
                  className="w-1/2 text-green-600 hover:text-green-600"
                >
                  Approve Project
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="w-1/2 text-red-600 hover:text-red-600"
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

export default ApproveProject;
