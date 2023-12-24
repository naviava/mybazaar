import { redirect } from "next/navigation";

import { Logo } from "~/components/logo";
import { RegisterWidget } from "./_components/register-widget";

import { serverClient } from "~/app/_trpc/server-client";

export default async function RegisterPage() {
  const user = await serverClient.user.getAuthProfile();

  if (!!user) return redirect("/");

  return (
    <>
      <RegisterWidget />
    </>
  );
}
