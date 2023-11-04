// External Dependencies
import { PieChart, Users, Clipboard, Image, Icon } from "react-feather";

// Menu Items
export type MenuItemProps = {
  id: number;
  name: string;
  Icon: Icon;
};

export const menuItems: MenuItemProps[] = [
  {
    id: 1,
    name: "Dashboard",
    Icon: PieChart,
  },
  {
    id: 2,
    name: "Users",
    Icon: Users,
  },
  {
    id: 3,
    name: "Categories",
    Icon: Clipboard,
  },
  {
    id: 4,
    name: "Drawings",
    Icon: Image,
  },
];
