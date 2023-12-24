import { v4 as uuid } from "uuid";
import { AccountOption } from "./account-option";

const ROUTES = [
  { label: "Your Account", href: "#", id: uuid() },
  { label: "Your Orders", href: "#", id: uuid() },
  { label: "Your Wishlist", href: "#", id: uuid() },
  { label: "Your Shopping Cart", href: "#", id: uuid() },
];

export function YourAccountPanel() {
  return (
    <ul className="space-y-1">
      <h4 className="mt-3 text-lg font-bold">Your Account</h4>
      {ROUTES.map((route) => (
        <AccountOption key={route.id} label={route.label} href={route.href} />
      ))}
    </ul>
  );
}
