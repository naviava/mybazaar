import { redirect } from "next/navigation";
import { OTPVerificationWidget } from "./_components/otp-verification-widget";
import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  params: { tempUserId: string };
}

export default async function ConfirmRegistrationPage({ params }: IProps) {
  const { tempUserId } = params;
  const tempUser = await serverClient.user.getTempUser(tempUserId);
  if (!tempUser) return redirect("/register");

  return (
    <>
      <OTPVerificationWidget user={tempUser} />
    </>
  );
}
