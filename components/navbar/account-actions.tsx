import { UserMenu } from "./user-menu";
import { serverClient } from "~/app/_trpc/server-client";

export async function AccountActions() {
  const user = await serverClient.user.getAuthProfile();

  return (
    <div className="flex items-center gap-x-8 text-white">
      <UserMenu />
      <div>Orders</div>
      <div>Cart</div>
    </div>
  );
}

console.log(typeof AccountActions);
