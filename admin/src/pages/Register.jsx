import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { registerSchema } from "@/validation/adminValidation";
import toast from "react-hot-toast";
import { handleError } from "@/utils/htmlErrorHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = registerSchema.safeParse({
      fullName,
      employeeId,
      department,
      email,
      password,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    await axiosInstance
      .post("/admins/register", {
        fullName: fullName,
        employeeId: employeeId,
        department: department,
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate("/admin/login");
      })
      .catch((error) => {
        handleError(error);
      });

    setFullName("");
    setEmployeeId("");
    setDepartment("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl mb-4 text-center">Register Admin</h1>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4 w-full">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="fullName" id="fullName">
                Full Name
              </Label>
              <Input
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                id="fullName"
                type="text"
                placeholder="Enter your Full Name"
              />
              {errors.fullName && (
                <p className="text-red-600">{errors.fullName._errors[0]}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="employeeId" id="employeeId">
                Employee ID
              </Label>
              <Input
                value={employeeId}
                onChange={(e) => {
                  setEmployeeId(e.target.value);
                }}
                id="employeeId"
                type="text"
                placeholder="Enter your Employee ID"
              />
              {errors.employeeId && (
                <p className="text-red-600">{errors.employeeId._errors[0]}</p>
              )}
            </div>

            <div className="grid w/full items-center gap-1.5">
              <Label htmlFor="department" id="department">
                Department
              </Label>

              <Select
                onValueChange={(value) => {
                  setDepartment(value);
                }}
                value={department}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="BBA-CA">BBA-CA</SelectItem>
                </SelectContent>
              </Select>

              {errors.department && (
                <p className="text-red-600">{errors.department._errors[0]}</p>
              )}
            </div>

            <div className="grid w/full items-center gap-1.5">
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

            <div className="grid w/full items-center gap-1.5">
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

            <Button onClick={handleRegister} type="submit">
              Register
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/admin/login" className="underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
