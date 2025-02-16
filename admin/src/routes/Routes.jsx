import React, { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from "react-router-dom";
import Layout from "@/Layout";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { Outlet } from "react-router-dom";
import {
  Home,
  Login,
  Logout,
  Profile,
  Register,
  ForgotPassword,
  ChangePassword,
  ResetPassword,
  ApproveProject,
  RejectProject,
  ViewSubmittedProjects,
  ViewApprovedProjects,
} from "@/pages";
import ProtectedRouteProvider from "./ProtectedRouteProvider";

const AdminRoutes = () => {
  const { fetchAdminDetails, logoutAdmin } = useAdmin();

  useEffect(() => {
    fetchAdminDetails();
  }, [fetchAdminDetails]);

  return <Outlet logoutAdmin={logoutAdmin} />;
};

export const Routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="admin"
        element={
          <AdminProvider>
            <AdminRoutes />
          </AdminProvider>
        }
      >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route
          element={
            <AdminProvider>
              <ProtectedRouteProvider />
            </AdminProvider>
          }
        >
          <Route path="logout" element={<Logout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route
            path="resetPassword/:passwordResetToken"
            element={<ResetPassword />}
          />
          <Route path="approveproject" element={<ApproveProject />} />
          <Route path="rejectproject" element={<RejectProject />} />
          <Route
            path="viewsubmittedprojects"
            element={<ViewSubmittedProjects />}
          />
          <Route
            path="viewapprovedprojects"
            element={<ViewApprovedProjects />}
          />
        </Route>
      </Route>
    </Route>
  )
);

export default Routes;
