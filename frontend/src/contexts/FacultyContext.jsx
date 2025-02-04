import React, { createContext, useContext, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const FacultyContext = createContext();

export const FacultyProvider = ({ children }) => {
  const [faculty, setFaculty] = useState({});
  const [assignedProjects, setAssignedProjects] = useState([]);

  const loginFaculty = (facultyData) => {
    const facultyDetails = {
      fullName: facultyData.faculty.fullName || "",
      email: facultyData.faculty.email || "",
      department: facultyData.faculty.department || "",
      designation: facultyData.faculty.designation || "",
    };

    const facultyProjects = facultyData.faculty.assignedProjects;

    setFaculty(facultyDetails);
    setAssignedProjects(facultyProjects);
  };

  const logoutFaculty = () => {
    setFaculty({});
    setAssignedProjects([]);
  };

  const fetchFacultyDetails = async () => {
    try {
      const response = await axiosInstance.get("/faculty/profile");
      const facultyData = response.data.data;
      loginFaculty(facultyData);
    } catch (error) {
      console.error("Failed to fetch faculty details:", error);
    }
  };

  return (
    <FacultyContext.Provider
      value={{
        faculty,
        assignedProjects,
        loginFaculty,
        logoutFaculty,
        fetchFacultyDetails,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
};

export const useFaculty = () => {
  return useContext(FacultyContext);
};
