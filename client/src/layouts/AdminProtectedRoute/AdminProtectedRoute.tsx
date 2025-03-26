import { PropsWithChildren, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../../context/AdminContext";
import { Oval } from "react-loader-spinner";

function AdminProtectedRoute({ children }: PropsWithChildren<{}>) {
  const { currentUser, loading, fetchCurrentUser } = useCurrentUser();

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
    return <Navigate to="/secure/login" replace />;
  }

  return <>{children || <Outlet />}</>;
}

export default AdminProtectedRoute;
// https://www.gov.uk/government/publications/skilled-worker-visa-immigration-salary-list/skilled-worker-visa-immigration-salary-list
