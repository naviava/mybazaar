import Link from "next/link";

import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { LoginWidget } from "./_components/login-widget";

export default function LoginPage() {
  return (
    <>
      <LoginWidget />
      <div>New to My Bazaar</div>
      <Button
        asChild
        variant="outline"
        className="w-full border border-gray-500 shadow-lg"
      >
        <Link href="/register">Create your My Bazaar account</Link>
      </Button>
    </>
  );
}
