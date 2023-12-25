"use client";

import { ArrowRightFromLine } from "lucide-react";

import { Button } from "~/components/ui/button";
import { SidebarContent } from "~/components/sidebar/sidebar-content";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ElementRef, useCallback, useRef } from "react";

export function MobileAdminSidebarButton() {
  const closeRef = useRef<ElementRef<"button">>(null);

  const handleCloseSheet = useCallback(() => {
    closeRef.current && closeRef.current.click();
  }, []);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="hover:bg-slate-900">
          <ArrowRightFromLine className="h-5 w-5 text-neutral-50" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="pt-6">
          <SidebarContent handleCloseSheet={handleCloseSheet} />
        </div>
        <SheetClose ref={closeRef} />
      </SheetContent>
    </Sheet>
  );
}
