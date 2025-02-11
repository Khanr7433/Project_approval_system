import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { projectSchema } from "@/validation/projectValidation";
import pdfLogo from "@/assets/pdfLogo.png";
import { handleError } from "@/utils/htmlErrorHandler";
import { Textarea } from "@/components/ui/textarea";

const StudentSubmitProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [synopsis, setSynopsis] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = projectSchema.safeParse({
      title,
      description,
      teamMembers,
      synopsis,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    // console.log(errors.teamMembers._errors);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("teamMembers", JSON.stringify(teamMembers));
    formData.append("synopsis", synopsis);

    await axiosInstance
      .post("/projects/uploadproject", formData)
      .then((response) => {
        toast.success(response.data.message);
        navigate("/student/viewprojects");
      })
      .catch((error) => {
        handleError(error);
      });

    setTitle("");
    setDescription("");
    setTeamMembers([]);
    setSynopsis(null);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl mb-4 text-center">Submit Project</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title" id="title">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                type="text"
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="text-red-600">{errors.title._errors[0]}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description" id="description">
                Description
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                rows="2"
                placeholder="Enter project's description (Min 25 characters)"
                className="border rounded p-2"
              />
              {errors.description && (
                <p className="text-red-600">{errors.description._errors[0]}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="teamMembers" id="teamMembers">
                Team Members (comma-separated emails)
              </Label>
              <Input
                value={teamMembers.join(", ")}
                onChange={(e) =>
                  setTeamMembers(
                    e.target.value.split(",").map((email) => email.trim())
                  )
                }
                id="teamMembers"
                type="text"
                placeholder="Enter team member's emails"
              />
              {errors.teamMembers && (
                <p className="text-red-600">{errors.teamMembers._errors}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="synopsis" id="synopsis">
                Synopsis
              </Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-500 dark:hover:border-gray-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">Click to upload</span> or{" "}
                      <span className="font-semibold">Drag and drop</span>
                    </p>
                    <p className="text-xs">PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => setSynopsis(e.target.files[0])}
                  />
                </label>
              </div>
              {errors.synopsis && (
                <p className="text-red-600">{errors.synopsis._errors[0]}</p>
              )}

              {synopsis && (
                <div className="mt-4 p-2 border rounded flex items-center">
                  <img
                    src={pdfLogo}
                    alt="PDF Logo"
                    className=" h-8 mr-2"
                    style={{ filter: "invert(0.5)" }}
                  />
                  <div>
                    <p className="text-sm">
                      <strong>File Name:</strong> {synopsis.name}
                    </p>
                    <p className="text-sm">
                      <strong>File Size:</strong>{" "}
                      {(synopsis.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentSubmitProject;
