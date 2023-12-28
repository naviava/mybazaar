"use client";

import { ElementRef, useCallback, useRef } from "react";
import { ArrowRightFromLine } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";
import { SidebarContent } from "~/components/sidebar/sidebar-content";

export function MobileAdminSidebarButton() {
  const closeRef = useRef<ElementRef<"button">>(null);

  const handleCloseSheet = useCallback(() => closeRef.current?.click(), []);

  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger onClick={handleCloseSheet}>
          <div role="button" className="m-auto p-2">
            <ArrowRightFromLine className="h-5 w-5 text-neutral-50" />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="max-w-[17rem] md:max-w-[20rem]">
          <div className="pt-6">
            <SidebarContent handleCloseSheet={handleCloseSheet} />
          </div>
          <SheetClose ref={closeRef} className="hidden" />
        </SheetContent>
      </Sheet>
    </div>
  );
}
