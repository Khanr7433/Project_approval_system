import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";

const ProtectedRouteProvider = () => {
  const { fetchAdminDetails, logoutAdmin } = useAdmin();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isLoggedIn = await fetchAdminDetails();
        setIsAdminLoggedIn(isLoggedIn);
        if (!isLoggedIn) {
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAdminStatus();
  }, [fetchAdminDetails, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAdminLoggedIn ? <Outlet logoutAdmin={logoutAdmin} /> : null;
};

export default ProtectedRouteProvider;
