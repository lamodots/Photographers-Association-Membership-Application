import React, { Fragment, useState } from "react";
import BrandLogo from "../../components/BrandLogo/BrandLogo";
import { Link, NavLink } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import { userDashboardMenus } from "../../util/menus/menus";
import { SidebarCloseIcon } from "lucide-react";

type MemberDashboardSideBarProp = {
  handleToggleSideBar: () => void;
};

function MemberDashboardSideBar({
  handleToggleSideBar,
}: MemberDashboardSideBarProp) {
  return (
    <aside className=" absolute z-50 shadow-lg bg-[#F5F7FA] border-r-2 border-r-[#C4DCF3] md:static md:z-0 md:shadow-none w-60 transition ease-in-out delay-150 duration-300">
      <SidebarCloseIcon
        className="relative left-6 mt-8 md:hidden"
        onClick={handleToggleSideBar}
      />
      <div className="brand py-8 px-6 mb-8 flex items-center border-b-2 border-b-[#C4DCF3] gap-3">
        <BrandLogo />
        <span className="text-2xl text-[#1A4F83] font-bold">Brand</span>
      </div>
      <div className="  px-6 links flex flex-col gap-6">
        {userDashboardMenus.map((menu) => (
          <NavLink
            to={`${menu.path}`}
            key={menu.key}
            className="cursor-pointer hover:text-[#5BD3CF]"
          >
            {({ isActive }) => (
              <div className="flex items-center gap-2">
                <Icon
                  name={menu.menuIcon}
                  size={24}
                  color={isActive ? "#5BD3CF" : "#537BA2"}
                />
                <span
                  className={`${
                    isActive ? "text-[#1A4F83] " : "text-[#537BA2]"
                  } text-lg`}
                >
                  {menu.label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
        {/* <NavLink to="/user">
          {({ isActive }) => (
            <div className="flex items-center gap-2">
              <LayoutDashboard
                size={32}
                strokeWidth={2}
                color={isActive ? "#5BD3CF" : "#537BA2"}
              />
              <span
                className={`${
                  isActive ? "text-[#1A4F83] font-bold" : "text-[#537BA2]"
                } text-lg`}
              >
                Overview
              </span>
            </div>
          )}
        </NavLink> */}
      </div>
    </aside>
  );
}

export default MemberDashboardSideBar;