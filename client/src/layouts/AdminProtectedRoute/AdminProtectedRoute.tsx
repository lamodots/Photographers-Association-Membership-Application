// import React, { PropsWithChildren, useEffect, useState } from "react";
// import { useCurrentUser } from "../../context/AdminContext";
// import { Navigate, Outlet } from "react-router-dom";
// import { Oval } from "react-loader-spinner";

// function AdminProtectedRoute({ children }: PropsWithChildren<{}>) {
//   const { currentUser } = useCurrentUser();
//   // const currentUser = true;
//   const [loading, setLoading] = useState(true);
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

//   if (!currentUser) {
//     return <Navigate to="/secure/login" />;
//   }

//   return <Outlet />;
// }

// export default AdminProtectedRoute;

import React, { PropsWithChildren, useEffect, useState } from "react";
import { useCurrentUser } from "../../context/AdminContext";
import { Navigate, Outlet } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function AdminProtectedRoute({ children }: PropsWithChildren<{}>) {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setLoading(false);
      if (currentUser !== null) {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentUser]);
  // useEffect(() => {
  //   if (currentUser !== null) {
  //     setLoading(false);
  //   }
  // }, [currentUser]);
  if (loading) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <Oval height="40" width="40" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/secure/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;
// https://www.gov.uk/government/publications/skilled-worker-visa-immigration-salary-list/skilled-worker-visa-immigration-salary-list
