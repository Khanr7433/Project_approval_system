import React, { createContext, useContext, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({});

  const loginStudent = (studentData) => {
    const studentDetails = {
      fullName: studentData.student.fullName || "",
      email: studentData.student.email || "",
      year: studentData.student.year || "",
      department: studentData.student.department || "",
      rollNo: studentData.student.rollNo || "",
    };

    setStudent(studentDetails);
  };

  const logoutStudent = () => {
    setStudent({});
  };

  const fetchStudentDetails = async () => {
    try {
      const response = await axiosInstance.get("/students/profile");
      const studentData = response.data.data;
      loginStudent(studentData);
    } catch (error) {
      console.error("Failed to fetch student details:", error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        setStudent,
        loginStudent,
        logoutStudent,
        fetchStudentDetails,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};
