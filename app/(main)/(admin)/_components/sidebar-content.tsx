"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface IProps {}

export function SidebarContent({}: IProps) {
  return (
    <>
      <Button asChild variant="ghost" className="w-full justify-start">
        <Link href="/" className="flex items-center">
          <Home className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Home</span>
        </Link>
      </Button>
    </>
  );
}
