import Link from "next/link";

import { Button } from "~/components/ui/button";
import { LoginWidget } from "./_components/login-widget";

export default function LoginPage() {
  return (
    <>
      <LoginWidget />
      <div className="mb-4 mt-6 flex items-center gap-x-2">
        <div className="h-[1px] flex-1 bg-neutral-300" />
        <div className="text-sm">New to My Bazaar?</div>
        <div className="h-[1px] flex-1 bg-neutral-300" />
      </div>
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
