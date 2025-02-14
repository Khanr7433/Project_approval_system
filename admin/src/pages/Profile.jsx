import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAdmin } from "@/contexts/AdminContext";

const Profile = () => {
  const { admin } = useAdmin();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Profile</h1>
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-2xl font-semibold">Details</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <div className="flex items-center">
              <svg
                className="border-2 rounded-full mr-4 w-16 h-16 p-2  -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="text-left pl-4">
                <p>Name : {admin.fullName}</p>
                <p>Email : {admin.email}</p>
                <p>Designation : {admin.designation}</p>
                <p>Department : {admin.department}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant="outline">Update Profile</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
