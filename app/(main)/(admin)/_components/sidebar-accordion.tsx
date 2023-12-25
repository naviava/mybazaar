import { CassetteTape, ShoppingCart, Truck, Users } from "lucide-react";

import { SidebarAccordionItem } from "./sidebar-accordion-item";
import { SidebarItem } from "./sidebar-item";

interface IProps {}

export function SidebarAccordion({}: IProps) {
  return (
    <>
      <SidebarAccordionItem label="Products" icon={ShoppingCart}>
        <SidebarItem label="Add Product" href="/admin/products/add-product" />
        <SidebarItem
          label="Manage Products"
          href="/admin/products/manage-products"
        />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Categories" icon={CassetteTape}>
        <SidebarItem label="Add Category" href="/admin/products/add-product" />
        <SidebarItem
          label="Manage Categories"
          href="/admin/products/manage-products"
        />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Orders" icon={Truck}>
        <SidebarItem label="View Orders" href="/admin/orders" />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Users" icon={Users}>
        <SidebarItem label="Back Office" href="/admin/users" />
        <SidebarItem label="Customers" href="/admin/customers" />
      </SidebarAccordionItem>
    </>
  );
}
