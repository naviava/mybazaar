import { Logo } from "~/components/logo";
import { Search } from "./search";
import { AccountActions } from "./account-actions";

export async function Navbar() {
  return (
    <nav className="fixed top-0 flex h-14 w-full items-center justify-between bg-slate-900 px-2 md:px-4 lg:px-6">
      <Logo height={50} width={50} />
      <Search />
      <AccountActions />
    </nav>
  );
}
