import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { z } from "zod";

const approveProjectSchema = z.object({
  projectId: z.string().nonempty("Project ID is required"),
  guideId: z.string().nonempty("Guide ID is required"),
});

const ApproveProject = ({ projectId }) => {
  const [guideId, setGuideId] = useState("");
  const [guides, setGuides] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance.get("/admin/getGuides").then((response) => {
      setGuides(response.data.guides);
    });
  }, []);

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
      .patch("/admin/approveProject", {
        projectId: projectId,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    await axiosInstance
      .patch("/admin/assignGuide", {
        guideId: guideId,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setGuideId("");
  };

  return (
    <AlertDialog>
      <AlertDialogContent className="w-full max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Project</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <form className="flex flex-col gap-4 w-full">
            <Select
              value={guideId}
              onChange={(e) => setGuideId(e.target.value)}
              placeholder="Select Guide"
            >
              {guides.map((guide) => (
                <SelectItem key={guide.id} value={guide.id}>
                  {guide.name}
                </SelectItem>
              ))}
            </Select>
            {errors.guideId && (
              <p className="text-red-600">{errors.guideId._errors[0]}</p>
            )}
            <Button onClick={handleApprove} type="submit">
              Approve
            </Button>
          </form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveProject;
