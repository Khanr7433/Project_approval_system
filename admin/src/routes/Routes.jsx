import React, { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
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
  ViewSubmittedProjects,
  ViewApprovedProjects,
} from "@/pages";

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
        <Route path="logout" element={<Logout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="changePassword" element={<ChangePassword />} />
        <Route
          path="resetPassword/:passwordResetToken"
          element={<ResetPassword />}
        />
        <Route path="approveproject/:projectId" element={<ApproveProject />} />
        <Route
          path="viewsubmittedprojects"
          element={<ViewSubmittedProjects />}
        />
        <Route path="viewapprovedprojects" element={<ViewApprovedProjects />} />
      </Route>
    </Route>
  )
);

export default Routes;
