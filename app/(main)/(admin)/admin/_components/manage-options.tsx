import { ManageOptionItem } from "./manage-option-item";

const MANAGE_OPTIONS = [
  { label: "Add Product", href: "/admin/add-product" },
  { label: "Manage Products", href: "/admin/manage-products" },
  { label: "Manage Categories", href: "/admin/manage-categories" },
  { label: "Manage Orders", href: "/admin/manage-orders" },
  { label: "Manage Users", href: "/admin/manage-users" },
];

export function ManageOptions() {
  return (
    <ul className="space-y-4 py-4 lg:border-r lg:border-neutral-500">
      {MANAGE_OPTIONS.map((item) => (
        <ManageOptionItem key={item.href} label={item.label} href={item.href} />
      ))}
    </ul>
  );
}
