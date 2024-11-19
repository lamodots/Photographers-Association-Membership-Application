import { icons } from "lucide-react";
type IconName = keyof typeof icons;

interface userRoutes {
  key: string;
  label: string;
  path: string;
  menuIcon: IconName;
}
export const userDashboardMenus: userRoutes[] = [
  {
    key: "overview",
    label: "Overview",
    path: "user",
    menuIcon: "LayoutDashboard",
  },
  {
    key: "content",
    label: "Content",
    path: "content",
    menuIcon: "Book",
  },
  {
    key: "members",
    label: "Members",
    path: "members",
    menuIcon: "UsersRound",
  },
  {
    key: "subscription",
    label: "Subscription",
    path: "subscription",
    menuIcon: "HandCoins",
  },
  {
    key: "events",
    label: "Events",
    path: "events",
    menuIcon: "Video",
  },
  {
    key: "certificate",
    label: "Certificate",
    path: "certificate",
    menuIcon: "GraduationCap",
  },
  {
    key: "idcard",
    label: "ID Card",
    path: "id_card",
    menuIcon: "IdCard",
  },
  {
    key: "settings",
    label: "Settings",
    path: "settings",
    menuIcon: "Settings",
  },
];
export const adminDashboardMenus = [];
