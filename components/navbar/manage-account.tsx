"use client";

import { memo } from "react";

import { Separator } from "~/components/ui/separator";
import { AuthAndAdminOptions } from "./auth-and-admin-options";
import { ManageAccountHeader } from "./manage-account-header";
import { AccountHubPanel } from "./account-hub-panel";

import { trpc } from "~/app/_trpc/client";

interface IProps {
  handleClose?: () => void;
}

export const ManageAccount = memo(_ManageAccount);
function _ManageAccount({ handleClose }: IProps) {
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  return (
    <>
      <ManageAccountHeader />
      <Separator className="my-2" />
      <AccountHubPanel handleClose={handleClose} />
      {!!user && (
        <>
          <Separator className="my-2" />
          <AuthAndAdminOptions userRole={user.role} handleClose={handleClose} />
        </>
      )}
    </>
  );
}
