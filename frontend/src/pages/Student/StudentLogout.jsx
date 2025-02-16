import React from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import axiosInstance from "@/utils/axiosInstance";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const StudentLogout = ({ isDialogOpen, setIsDialogOpen, logoutStudent }) => {
  const navigate = useNavigate();
  const logout = () => {
    logoutStudent;
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post("/students/logout")
      .then((response) => {
        toast.success(response.data.message);
        Cookies.remove("token");
        setIsDialogOpen(false);
        logout();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });

    setIsDialogOpen(false);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will log you out of the system
            and you will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StudentLogout;
