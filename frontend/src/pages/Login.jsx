import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const Login = () => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center justify-center border border-red-600 rounded-lg">
          <h1 className="text-2xl">Login</h1>
          <form className="flex flex-col gap-4 px-10 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => (setEmail = e.target.value)}
                type="email"
                placeholder="Enter your Email"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Password</Label>
              <Input
                value={password}
                onChange={(e) => (setPassword = e.target.value)}
                type="password"
                placeholder="Enter your Password"
              />
            </div>
            <Button onClick={handleLogin} type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
