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
    color: "text-[#04724d]",
  },
  {
    label: "Manage Products",
    href: "/admin/manage-products",
    icon: MdShoppingCart,
    color: "text-[#05668d]",
  },
  {
    label: "Manage Categories",
    href: "/admin/manage-categories",
    icon: BiSolidCategoryAlt,
    color: "text-[#5f0f40]",
  },
  {
    label: "Manage Orders",
    href: "/admin/manage-orders",
    icon: ImTruck,
    color: "text-[#9a031e]",
  },
  {
    label: "Manage Users",
    href: "/admin/manage-users",
    icon: FaUsersGear,
    color: "text-[#0f4c5c]",
  },
];

export function ManageOptions() {
  return (
    <ul className="flex gap-x-2 overflow-x-auto py-2">
      {MANAGE_OPTIONS.map((item) => (
        <ManageOptionItem
          key={item.href}
          label={item.label}
          href={item.href}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </ul>
  );
}
