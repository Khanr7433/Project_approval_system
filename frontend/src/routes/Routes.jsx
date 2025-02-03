import React from "react";
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
  StudentRegister,
  StudentProfile,
  StudentForgotPassword,
  StudentLogout,
} from "@/pages/Student";
import {
  FacultyHome,
  FacultyLogin,
  FacultyRegister,
  FacultyForgotPassword,
  FacultyProfile,
} from "@/pages/Faculty";

const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="student">
        <Route index element={<StudentHome />} />
        <Route path="login" element={<StudentLogin />} />
        <Route path="register" element={<StudentRegister />} />
        <Route path="logout" element={<StudentLogout />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="forgotpassword" element={<StudentForgotPassword />} />
      </Route>
      <Route path="faculty">
        <Route index element={<FacultyHome />} />
        <Route path="login" element={<FacultyLogin />} />
        <Route path="register" element={<FacultyRegister />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="forgotpassword" element={<FacultyForgotPassword />} />
      </Route>
    </Route>
  )
);

export default Routes;
