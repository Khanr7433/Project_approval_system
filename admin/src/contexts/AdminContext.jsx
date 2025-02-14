import React, { createContext, useContext, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState({});

  const loginAdmin = (adminData) => {
    const AdminDetails = {
      fullName: adminData.admin.fullName || "",
      email: adminData.admin.email || "",
      department: adminData.admin.department || "",
      designation: adminData.admin.designation || "",
    };

    setAdmin(AdminDetails);
  };

  const logoutAdmin = () => {
    setAdmin({});
  };

  const fetchAdminDetails = async () => {
    try {
      const response = await axiosInstance.get("/admin/profile");
      const studentData = response.data.data;
      loginAdmin(studentData);
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        loginAdmin,
        logoutAdmin,
        fetchAdminDetails,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
