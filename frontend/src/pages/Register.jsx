import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registering student");
    console.log({ fullName, rollNo, year, department, email, password });

    const registerdStudent = await axios
      .post(`${import.meta.env.BACKEND_URL}/students/register`, {
        fullName: fullName,
        rollNo: rollNo,
        year: year,
        department: department,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(registerdStudent);
  };

  return (
    <>
      <div className="h-screen w-screen">
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center justify-center border border-red-600 rounded-lg">
            <h1 className="text-2xl">Register Student</h1>
            <form className="flex flex-col gap-4 px-10 py-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="fullName" id="fullName">
                  Full Name
                </Label>
                <Input
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  id="fullName"
                  type="fullName"
                  placeholder="Enter your Full Name"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="rollNo" id="rollNo">
                  Roll No.
                </Label>
                <Input
                  value={rollNo}
                  onChange={(e) => {
                    setRollNo(e.target.value);
                  }}
                  id="rollNo"
                  type="Number"
                  placeholder="Enter your Roll No"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="year" id="year">
                  Year
                </Label>
                <Input
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  id="year"
                  type="text"
                  placeholder="Enter your Current Year (TY, SY, FY)"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="department" id="department">
                  Department
                </Label>
                <Input
                  value={department}
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  id="department"
                  type="text"
                  placeholder="Enter your Depatment (BCA, BBA-CA)"
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
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
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
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
              </div>

              <Button onClick={handleRegister} type="submit">
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
