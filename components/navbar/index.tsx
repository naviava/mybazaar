"use client";

import { usePathname } from "next/navigation";
import { useIsMounted } from "~/hooks/use-is-mounted";

import { Logo } from "~/components/logo";
import { MobileAdminSidebarButton } from "./mobile-admin-sidebar-button";
import { AccountActions } from "./account-actions";
import { Search } from "./search";

import { trpc } from "~/app/_trpc/client";
import Link from "next/link";

export function Navbar() {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  if (!isMounted) return <div className="fixed top-0 h-14 w-full bg-sky-900" />;

  return (
    <nav className="fixed top-0 z-[50] flex h-14 w-full items-center justify-between gap-x-8 bg-sky-900 px-2 md:px-4 lg:px-6">
      <div className="flex items-center gap-x-2">
        <Logo height={50} width={50} />
        {(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") &&
          pathname.startsWith("/admin") && <MobileAdminSidebarButton />}
      </div>
      <div className="hidden max-w-2xl flex-1 md:block">
        <Search />
      </div>
      <AccountActions />
    </nav>
  );
}
