import React, { useState } from "react";
import MemberDashboardSideBar from "../MemberDashboardSideBar/MemberDashboardSideBar";
import AdminDashboardSideBar from "../AdminDashboardSideBar/AdminDashboardSideBar";
import TopNavBar from "../TopNavBar/TopNavBar";
import { Outlet } from "react-router-dom";

function AdminDashboardLayout() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showMorePopUp, setShowMorePopUp] = useState(false);
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  const togglePopUp = () => {
    setShowMorePopUp(!showMorePopUp);
  };
  return (
    <div className=" flex w-full h-[auto] min-h-screen">
      <div
        className={`h-screen overflow-y-auto overflow-x-hidden md:${
          showSideBar ? "w-[296px]" : "w-0"
        } bg-[#1A4F83] `}
      >
        {showSideBar && (
          <AdminDashboardSideBar handleToggleSideBar={toggleSideBar} />
        )}
      </div>

      <main className=" bg-[#F5F7FA] max-h-screen overflow-y-scroll w-full">
        <TopNavBar
          handleToggleSideBar={toggleSideBar}
          handlePopUp={togglePopUp}
          showMorePopUp={showMorePopUp}
        />

        <section
          className=" px-8 pb-16"
          onClick={() => setShowMorePopUp(false)}
        >
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminDashboardLayout;
