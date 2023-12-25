import { UserMenu } from "./user-menu";

export function AccountActions() {
  return (
    <div className="flex items-center gap-x-8 text-white">
      <UserMenu />
      <div className="text-sm md:text-base">Orders</div>
      <div className="text-sm md:text-base">Cart</div>
    </div>
  );
}
