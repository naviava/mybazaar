"use client";

import { Logo } from "~/components/logo";
import { MobileAdminSidebarButton } from "./mobile-admin-sidebar-button";
import { AccountActions } from "./account-actions";
import { Search } from "./search";

import { trpc } from "~/app/_trpc/client";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  return (
    <nav className="fixed top-0 flex h-14 w-full items-center justify-between gap-x-8 bg-slate-900 px-2 md:px-4 lg:px-6">
      <div className="flex items-center gap-x-2">
        <Logo height={50} width={50} />
        {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") &&
          pathname.includes("/admin") && <MobileAdminSidebarButton />}
      </div>
      <div className="hidden max-w-2xl flex-1 md:block">
        <Search />
      </div>
      <AccountActions />
    </nav>
  );
}
