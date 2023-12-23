import { Logo } from "~/components/logo";
import { Search } from "./search";
import { AccountActions } from "./account-actions";

import { serverClient } from "~/app/_trpc/server-client";

interface Props {}

export async function Navbar({}: Props) {
  const user = await serverClient.users.getAuthProfile();

  return (
    <nav className="flex h-14 items-center justify-between bg-slate-900 px-2 md:px-4 lg:px-6">
      <Logo height={50} width={50} />
      <Search />
      <AccountActions />
    </nav>
  );
}
