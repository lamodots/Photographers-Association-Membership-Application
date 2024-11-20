import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const isAuthenticated = !!localStorage.getItem("authToken"); // Check login status
  // const hasCompletedOnboarding =
  //   localStorage.getItem("onboardingCompleted") === "true";

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // // Redirect to onboarding if not completed
  // if (!hasCompletedOnboarding) {
  //   return <Navigate to="/member-onboarding" />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
