import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";
import { z } from "zod";

const emailSchema = z
  .string()
  .email("Invalid email format")
  .nonempty("Email is required");

const StudentForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = emailSchema.safeParse(email);

    if (!validationResult.success) {
      setErrors({ email: validationResult.error.errors[0].message });
      return;
    }

    await axiosInstance
      .post("/students/forgotpassword", { email })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });

    setEmail("");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl mb-4 text-center">Forgot Password</h1>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleForgotPassword}
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" id="email">
                Email
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Enter your Email"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentForgotPassword;
