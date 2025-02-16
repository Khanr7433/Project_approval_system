import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useStudent } from "@/contexts/StudentContext";

const StudentProtectedRouteProvider = () => {
  const { fetchStudentDetails, logoutStudent } = useStudent();
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStudentStatus = async () => {
      try {
        const isLoggedIn = await fetchStudentDetails();
        setIsStudentLoggedIn(isLoggedIn);
        if (!isLoggedIn) {
          navigate("/student/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkStudentStatus();
  }, [fetchStudentDetails, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isStudentLoggedIn ? <Outlet logoutStudent={logoutStudent} /> : null;
};

export default StudentProtectedRouteProvider;
