"use client";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "../ui/button";
import { ArrowRightFromLine } from "lucide-react";
import { SidebarContent } from "~/app/(main)/(admin)/_components/sidebar-content";

interface IProps {}

export function MobileAdminSidebarButton({}: IProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="hover:bg-slate-900">
          <ArrowRightFromLine className="h-5 w-5 text-neutral-50" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="pt-6">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
