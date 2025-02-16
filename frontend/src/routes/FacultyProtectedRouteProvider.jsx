import { useFaculty } from "@/contexts/FacultyContext";
import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const FacultyProtectedRouteProvider = () => {
  const { fetchFacultyDetails, logoutFaculty } = useFaculty();
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkFacultyStatus = async () => {
      try {
        const isLoggedIn = await fetchFacultyDetails();
        setIsFacultyLoggedIn(isLoggedIn);
        if (!isLoggedIn) {
          navigate("/faculty/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkFacultyStatus();
  }, [fetchFacultyDetails, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isFacultyLoggedIn ? <Outlet logoutFaculty={logoutFaculty} /> : null;
};

export default FacultyProtectedRouteProvider;
