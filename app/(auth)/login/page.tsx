import { redirect } from "next/navigation";
import { LoginWidget } from "./_components/login-widget";
import { RegisterLink } from "./_components/register-link";
import { serverClient } from "~/app/_trpc/server-client";

export default async function LoginPage() {
  const user = await serverClient.user.getAuthProfile();
  if (!!user) return redirect("/");

  return (
    <>
      <LoginWidget />
      <RegisterLink />
    </>
  );
}
