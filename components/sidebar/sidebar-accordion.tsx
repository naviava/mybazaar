import { CassetteTape, ShoppingCart, Truck, Users } from "lucide-react";

import { SidebarAccordionItem } from "./sidebar-accordion-item";
import { SidebarItem } from "./sidebar-item";

interface IProps {
  handleCloseSheet?: () => void;
}

export function SidebarAccordion({ handleCloseSheet }: IProps) {
  return (
    <>
      <SidebarAccordionItem label="Products" icon={ShoppingCart}>
        <SidebarItem
          label="Add Product"
          href="/admin/products/add-product"
          handleClick={handleCloseSheet}
        />
        <SidebarItem
          label="Manage Products"
          href="/admin/products"
          handleClick={handleCloseSheet}
        />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Categories" icon={CassetteTape}>
        <SidebarItem
          label="Add Category"
          href="/admin/categories/add-category"
          handleClick={handleCloseSheet}
        />
        <SidebarItem
          label="Manage Categories"
          href="/admin/categories"
          handleClick={handleCloseSheet}
        />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Orders" icon={Truck}>
        <SidebarItem
          label="View Orders"
          href="/admin/orders"
          handleClick={handleCloseSheet}
        />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Users" icon={Users}>
        <SidebarItem
          label="Back Office"
          href="/admin/users"
          handleClick={handleCloseSheet}
        />
        <SidebarItem
          label="Customers"
          href="/admin/customers"
          handleClick={handleCloseSheet}
        />
      </SidebarAccordionItem>
    </>
  );
}
