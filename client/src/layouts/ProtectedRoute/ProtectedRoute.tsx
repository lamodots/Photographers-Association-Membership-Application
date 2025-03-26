import { PropsWithChildren, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../context/AdminContext";
import { Oval } from "react-loader-spinner";

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
  const { currentUser, loading, fetchCurrentUser } = useCurrentUser();

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
  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser(); // Ensure currentUser is always fetched
    }
  }, [currentUser, fetchCurrentUser]);
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Oval height="40" width="40" color="#4A90E2" />
      </div>
    );
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
