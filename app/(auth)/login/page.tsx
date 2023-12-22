import Link from "next/link";

import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { LoginWidget } from "./_components/login-widget";

interface Props {}

export default function LoginPage({}: Props) {
  return (
    <div className="w-full bg-white pb-10 pt-6">
      <div className="mx-6 max-w-sm space-y-8 md:mx-auto">
        <Logo />
        <LoginWidget />
        <div>New to My Bazaar</div>
        <Button
          asChild
          variant="outline"
          className="w-full border border-gray-500 shadow-lg"
        >
          <Link href="/register">Create your My Bazaar account</Link>
        </Button>
      </div>
    </div>
  );
}
