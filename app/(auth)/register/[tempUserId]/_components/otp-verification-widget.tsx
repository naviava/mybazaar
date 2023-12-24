import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { OTPFormInput } from "./otp-form-input";

import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  user: Awaited<ReturnType<typeof serverClient.users.getTempUser>>;
}

export function OTPVerificationWidget({ user }: IProps) {
  if (!user) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify your email, {user.name}</CardTitle>
        <CardDescription>
          Enter the OTP you received in your mailbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OTPFormInput tempUserId={user.id} />
      </CardContent>
      <CardFooter>
        <Link href="/" className="flex items-center text-sm text-blue-700">
          <ChevronLeft className="mr-1 h-3 w-3" />
          <span className="hover:underline">Go to homepage</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
