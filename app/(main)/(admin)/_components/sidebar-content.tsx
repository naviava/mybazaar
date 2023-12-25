"use client";

import { Home } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

interface IProps {}

export function SidebarContent({}: IProps) {
  return (
    <>
      <SidebarItem label="Home" href="/" icon={Home} />
      <h3 className="mt-6 px-4 font-bold uppercase text-muted-foreground">
        Manage Shop
      </h3>
    </>
  );
}
