import { IconName } from "./icons";

export const ITEM_MENUS: ItemMenu[] = [
  {
    title: "Dashboard",
    icon: "i-circle-guage",
    path: "/app/dashboard",
  },
  {
    title: "Courses",
    icon: "i-book-open",
    path: "/app/courses",
  },
  {
    title: "User Management",
    icon: "i-user",
    path: "/app/user-management",
    // children: [
    //   {
    //     title: "Users",
    //     icon: "i-users",
    //     path: "/management/users",
    //   },
    //   {
    //     title: "Roles",
    //     icon: "i-shield-check",
    //     path: "/management/roles",
    //   },
    // ],
  },
];

export type ItemMenu = {
  title: string;
  icon: IconName;
  path?: string;
  children?: ItemMenu[];
};
