import { CassetteTape, ShoppingCart, Truck, Users } from "lucide-react";

import { SidebarHoverItem } from "./sidebar-hover-item";
import { SidebarItem } from "./sidebar-item";

interface IProps {}

export function SidebarHoverCards({}: IProps) {
  return (
    <div className="mt-4 flex flex-col gap-y-4">
      <SidebarHoverItem icon={ShoppingCart}>
        <SidebarItem
          isHoverCard
          label="Add Product"
          href="/admin/products/add-product"
        />
        <SidebarItem
          isHoverCard
          label="Manage Products"
          href="/admin/products/manage-products"
        />
      </SidebarHoverItem>
      <SidebarHoverItem icon={CassetteTape}>
        <SidebarItem
          isHoverCard
          label="Add Category"
          href="/admin/products/add-product"
        />
        <SidebarItem
          isHoverCard
          label="Manage Categories"
          href="/admin/products/manage-products"
        />
      </SidebarHoverItem>
      <SidebarHoverItem icon={Truck}>
        <SidebarItem isHoverCard label="View Orders" href="/admin/orders" />
      </SidebarHoverItem>
      <SidebarHoverItem icon={Users}>
        <SidebarItem isHoverCard label="Back Office" href="/admin/users" />
        <SidebarItem isHoverCard label="Customers" href="/admin/customers" />
      </SidebarHoverItem>
    </div>
  );
}
