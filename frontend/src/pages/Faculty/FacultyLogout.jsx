import React from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosInstance";
import { useFaculty } from "@/contexts/FacultyContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FacultyLogout;
