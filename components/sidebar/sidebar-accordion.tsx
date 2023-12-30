"use client";

import { CassetteTape, ShoppingCart, Truck, Users } from "lucide-react";

import { SidebarAccordionItem } from "./sidebar-accordion-item";
import { SidebarItem } from "./sidebar-item";
import { memo } from "react";

interface IProps {
  handleCloseSheet?: () => void;
}

export const SidebarAccordion = memo(_SidebarAccordion);
function _SidebarAccordion({ handleCloseSheet }: IProps) {
  return (
    <>
      <SidebarAccordionItem
        label="Products"
        icon={ShoppingCart}
        groupHref="/admin/products"
      >
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
      <SidebarAccordionItem
        label="Categories"
        icon={CassetteTape}
        groupHref="/admin/categories"
      >
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
      <SidebarAccordionItem
        label="Orders"
        icon={Truck}
        groupHref="/admin/orders"
      >
        <SidebarItem
          label="View Orders"
          href="/admin/orders"
          handleClick={handleCloseSheet}
        />
      </SidebarAccordionItem>
      <SidebarAccordionItem label="Users" icon={Users} groupHref="/admin/users">
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
