import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosInstance";
import { loginSchema } from "@/validation/studentValidation";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = loginSchema.safeParse({
      email,
      password,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    await axiosInstance
      .post("/students/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success(response.data.message);
        Cookies.set("token", response.data.token);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center border border-red-600 rounded-lg p-4 md:p-10 w-full max-w-md">
        <h1 className="text-2xl mb-4">Login Student</h1>
        <form className="flex flex-col gap-4 w-full">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email" id="email">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              type="email"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email._errors[0]}</p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password" id="password">
              Password
            </Label>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              placeholder="Enter your Password"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password._errors[0]}</p>
            )}
          </div>

          <Button onClick={handleLogin} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
