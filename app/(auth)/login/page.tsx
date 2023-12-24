import Link from "next/link";

import { Button } from "~/components/ui/button";
import { LoginWidget } from "./_components/login-widget";
import { serverClient } from "~/app/_trpc/server-client";
import { redirect } from "next/navigation";
import { RegisterLink } from "./_components/register-link";

export default async function LoginPage() {
  const user = await serverClient.user.getAuthProfile();
  if (!!user) return redirect("/");

  return (
    <>
      <LoginWidget />
      <div className="mb-4 mt-6 flex items-center gap-x-2">
        <div className="h-[1px] flex-1 bg-neutral-300" />
        <div className="text-sm">New to My Bazaar?</div>
        <div className="h-[1px] flex-1 bg-neutral-300" />
      </div>
      <RegisterLink />
    </>
  );
}
