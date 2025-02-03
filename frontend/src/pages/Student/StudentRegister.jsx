import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState } from "react";
import { studentSchema } from "@/validation/studentValidation";
import toast from "react-hot-toast";
import { handleError } from "@/utils/htmlErrorHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StudentRegister = () => {
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationResult = studentSchema.safeParse({
      fullName,
      rollNo,
      year,
      department,
      email,
      password,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setErrors(fieldErrors);
      return;
    }

    console.log("Registering student");
    console.log({ fullName, rollNo, year, department, email, password });

    await axiosInstance
      .post("/students/register", {
        fullName: fullName,
        rollNo: rollNo,
        year: year,
        department: department,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        handleError(error);
      });

    setFullName("");
    setRollNo("");
    setYear("");
    setDepartment("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center border border-red-600 rounded-lg p-4 md:p-10 w-full max-w-md">
          <h1 className="text-2xl mb-4">Register Student</h1>
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
              <Label htmlFor="rollNo" id="rollNo">
                Roll No.
              </Label>
              <Input
                value={rollNo}
                onChange={(e) => {
                  setRollNo(e.target.value);
                }}
                id="rollNo"
                type="number"
                placeholder="Enter your Roll No"
              />
              {errors.rollNo && (
                <p className="text-red-600">{errors.rollNo._errors[0]}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="year" id="year">
                Year
              </Label>
              <Select
                onValueChange={(value) => {
                  setYear(value);
                }}
                value={year}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FY">FY</SelectItem>
                  <SelectItem value="SY">SY</SelectItem>
                  <SelectItem value="TY">TY</SelectItem>
                </SelectContent>
              </Select>

              {errors.year && (
                <p className="text-red-600">{errors.year._errors[0]}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
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

            <Button onClick={handleRegister} type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
