import React, { PropsWithChildren, useEffect, useState } from "react";
import { useCurrentUser } from "../../context/AdminContext";
import { Navigate, Outlet, Route } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function AdminProtectedRoute({ children }: PropsWithChildren<{}>) {
  //   const { currentUser } = useCurrentUser();
  const currentUser = true;
  const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     if (currentUser !== null) {
  //       setLoading(false);
  //     }
  //   }, [currentUser]);

  //   if (loading) {
  //     return (
  //       <div>
  //         <Oval height="40" width="40" />
  //       </div>
  //     );
  //   }

  if (!currentUser) {
    return <Navigate to="/secure/login" />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
