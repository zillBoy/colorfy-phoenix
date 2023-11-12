// External Dependencies
import { PieChart, Users, Clipboard, Image, Icon } from "react-feather";

// Menu Items
export type MenuItemProps = {
  id: number;
  name: string;
  link: string;
  Icon: Icon;
};

export const menuItems: MenuItemProps[] = [
  {
    id: 1,
    name: "Dashboard",
    link: "/",
    Icon: PieChart,
  },
  {
    id: 2,
    name: "Users",
    link: "/users",
    Icon: Users,
  },
  {
    id: 3,
    name: "Categories",
    link: "/categories",
    Icon: Clipboard,
  },
  {
    id: 4,
    name: "Drawings",
    link: "/drawings",
    Icon: Image,
  },
];
