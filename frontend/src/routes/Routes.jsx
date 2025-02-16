import React, { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import {
  StudentHome,
  StudentLogin,
  StudentLogout,
  StudentRegister,
  StudentProfile,
  StudentChangePassword,
  StudentSubmitProject,
  StudentViewProjects,
  StudentDeleteProject,
} from "@/pages/Student";
import {
  FacultyHome,
  FacultyLogin,
  FacultyRegister,
  FacultyLogout,
  FacultyChangePassword,
  FacultyProfile,
  ViewAssignedProjects,
} from "@/pages/Faculty";
import { StudentProvider, useStudent } from "@/contexts/StudentContext";
import { FacultyProvider, useFaculty } from "@/contexts/FacultyContext";
import { Outlet } from "react-router-dom";
import StudentProtectedRouteProvider from "./StudentProtectedRouteProvider";
import FacultyProtectedRouteProvider from "./FacultyProtectedRouteProvider";

const StudentRoutes = () => {
  const { fetchStudentDetails, logoutStudent } = useStudent();

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  return <Outlet logoutStudent={logoutStudent} />;
};

const FacultyRoutes = () => {
  const { fetchFacultyDetails, logoutFaculty } = useFaculty();

  useEffect(() => {
    fetchFacultyDetails();
  }, [fetchFacultyDetails]);

  return <Outlet logoutFaculty={logoutFaculty} />;
};

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route
        path="student"
        element={
          <StudentProvider>
            <StudentRoutes />
          </StudentProvider>
        }
      >
        <Route index element={<StudentHome />} />
        <Route path="login" element={<StudentLogin />} />
        <Route path="register" element={<StudentRegister />} />
        <Route
          element={
            <StudentProvider>
              <StudentProtectedRouteProvider />
            </StudentProvider>
          }
        >
          <Route path="logout" element={<StudentLogout />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="changepassword" element={<StudentChangePassword />} />
          <Route path="submitproject" element={<StudentSubmitProject />} />
          <Route path="viewprojects" element={<StudentViewProjects />} />
          <Route path="deleteproject" element={<StudentDeleteProject />} />
        </Route>
      </Route>

      <Route
        path="faculty"
        element={
          <FacultyProvider>
            <FacultyRoutes />
          </FacultyProvider>
        }
      >
        <Route index element={<FacultyHome />} />
        <Route path="login" element={<FacultyLogin />} />
        <Route path="register" element={<FacultyRegister />} />
        <Route
          element={
            <FacultyProvider>
              <FacultyProtectedRouteProvider />
            </FacultyProvider>
          }
        >
          <Route path="logout" element={<FacultyLogout />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="changepassword" element={<FacultyChangePassword />} />
          <Route
            path="viewassignedprojects"
            element={<ViewAssignedProjects />}
          />
        </Route>
      </Route>
    </Route>
  )
);

export default Routes;
