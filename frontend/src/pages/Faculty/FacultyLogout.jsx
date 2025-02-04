import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosInstance";
import { useFaculty } from "@/contexts/FacultyContext";

const FacultyLogout = () => {
  const { logoutFaculty } = useFaculty();

  const handleLogout = async () => {
    await axiosInstance
      .post("/faculty/logout")
      .then((response) => {
        toast.success(response.data.message);
        console.log(response.data);
        Cookies.remove("token");
        logoutFaculty();
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  const confirmLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await handleLogout();
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Button onClick={confirmLogout} className="bg-red-500 text-white">
        Logout
      </Button>
    </div>
  );
};

export default FacultyLogout;
