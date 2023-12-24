import { v4 as uuid } from "uuid";
import { AccountOption } from "./account-option";

const ROUTES = [
  { label: "Your Account", href: "#", id: uuid() },
  { label: "Your Orders", href: "#", id: uuid() },
  { label: "Your Wishlist", href: "#", id: uuid() },
  { label: "Your Shopping Cart", href: "#", id: uuid() },
];

interface IProps {
  handleClose?: () => void;
}

export function AccountHubPanel({ handleClose }: IProps) {
  return (
    <ul className="space-y-1">
      <h4 className="mt-3 text-base font-bold md:text-lg">Account Hub</h4>
      {ROUTES.map((route) => (
        <AccountOption
          key={route.id}
          label={route.label}
          href={route.href}
          handleClose={handleClose}
        />
      ))}
    </ul>
  );
}
