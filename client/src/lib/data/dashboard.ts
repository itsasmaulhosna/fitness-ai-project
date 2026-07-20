import {
  User,
  PlusCircle,
  ClipboardList,
  MessageCircle,
} from "lucide-react";

export const dashboardLinks = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Add",
    href: "/dashboard/add",
    icon: PlusCircle,
  },
  {
    title: "Manage",
    href: "/dashboard/manage",
    icon: ClipboardList,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageCircle,
  },
];