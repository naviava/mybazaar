import { redirect } from "next/navigation";

import { Logo } from "~/components/logo";
import { RegisterWidget } from "./_components/register-widget";

import { serverClient } from "~/app/_trpc/server-client";

export default async function RegisterPage() {
  const user = await serverClient.users.getAuthProfile();

  if (!!user) return redirect("/");

  return (
    <div className="w-full bg-white px-4 pb-10 pt-6 md:px-0">
      <div className="mx-auto max-w-md space-y-8">
        <Logo />
        <RegisterWidget />
      </div>
    </div>
  );
}
