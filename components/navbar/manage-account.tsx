"use client";

import { Separator } from "~/components/ui/separator";
import { AuthAndAdminOptions } from "./auth-and-admin-options";
import { ManageAccountHeader } from "./manage-account-header";
import { AccountHubPanel } from "./account-hub-panel";
import { trpc } from "~/app/_trpc/client";

export function ManageAccount() {
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  return (
    <>
      <ManageAccountHeader />
      <Separator className="my-2" />
      <AccountHubPanel />
      {!!user && (
        <>
          <Separator className="my-2" />
          <AuthAndAdminOptions userRole={user.role} />
        </>
      )}
    </>
  );
}
