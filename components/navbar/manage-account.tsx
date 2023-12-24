import { Separator } from "~/components/ui/separator";
import { ManageAccountHeader } from "./manage-account-header";
import { YourAccountPanel } from "./your-account-panel";
import { signOut } from "next-auth/react";

export function ManageAccount() {
  return (
    <>
      <ManageAccountHeader />
      <Separator className="my-2" />
      <YourAccountPanel />
      <Separator className="my-2" />
      <div onClick={() => signOut()} className="link py-1">
        Sign out
      </div>
    </>
  );
}
