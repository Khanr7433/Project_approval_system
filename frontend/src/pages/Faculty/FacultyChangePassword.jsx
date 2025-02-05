import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { z } from "zod";

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

const FacultyChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = passwordSchema.safeParse({ oldPassword, newPassword });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    await axiosInstance
      .post("/faculty/changepassword", {
        oldPassword,
        newPassword,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Something went wrong!");
        console.log(error);
      });

    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl mb-4 text-center">Change Password</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="oldPassword" id="oldPassword">
                Old Password
              </Label>
              <Input
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                id="oldPassword"
                type="password"
                placeholder="Enter your old password"
                required
              />
              {errors.oldPassword && (
                <p className="text-red-600">{errors.oldPassword}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5"></div>
            <Label htmlFor="newPassword" id="newPassword">
              New Password
            </Label>
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              required
            />
            {errors.newPassword && (
              <p className="text-red-600">{errors.newPassword}</p>
            )}

            <Button type="submit">Change Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyChangePassword;
