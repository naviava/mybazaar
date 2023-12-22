import { UserMenu } from "./user-menu";
import { serverClient } from "~/app/_trpc/server-client";

interface Props {}

export function AccountActions({}: Props) {
  return (
    <div className="flex items-center gap-x-8 text-white">
      <UserMenu />
      <div>Orders</div>
      <div>Cart</div>
    </div>
  );
}

console.log(typeof AccountActions);
