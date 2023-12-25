import { ImTruck } from "react-icons/im";
import { FaUsersGear } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

import { ManageOptionItem } from "./manage-option-item";

const MANAGE_OPTIONS = [
  {
    label: "Add Product",
    href: "/admin/add-product",
    icon: TbSquareRoundedPlusFilled,
  },
  {
    label: "Manage Products",
    href: "/admin/manage-products",
    icon: MdShoppingCart,
  },
  {
    label: "Manage Categories",
    href: "/admin/manage-categories",
    icon: BiSolidCategoryAlt,
  },
  {
    label: "Manage Orders",
    href: "/admin/manage-orders",
    icon: ImTruck,
  },
  {
    label: "Manage Users",
    href: "/admin/manage-users",
    icon: FaUsersGear,
  },
];

export function ManageOptions() {
  return (
    <ul className="space-y-4 py-4 lg:border-r lg:border-neutral-500">
      {MANAGE_OPTIONS.map((item) => (
        <ManageOptionItem
          key={item.href}
          label={item.label}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </ul>
  );
}
