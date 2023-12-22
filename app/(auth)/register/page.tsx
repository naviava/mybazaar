import { Logo } from "~/components/logo";
import { RegisterWidget } from "./_components/register-widget";
import { serverClient } from "~/app/_trpc/server-client";
import { redirect } from "next/navigation";

interface Props {}

export default async function RegisterPage({}: Props) {
  const user = await serverClient.users.getAuthProfile();

  if (!!user) return redirect("/");

  return (
    <div className="w-full bg-white pb-10 pt-6">
      <div className="mx-6 max-w-sm space-y-8 md:mx-auto">
        <Logo />
        <RegisterWidget />
      </div>
    </div>
  );
}
