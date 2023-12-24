import { Separator } from "~/components/ui/separator";
import { ManageAccountHeader } from "./manage-account-header";

export function ManageAccount() {
  return (
    <>
      <ManageAccountHeader />
      <Separator className="my-2" />
      <div>A</div>
    </>
  );
}
