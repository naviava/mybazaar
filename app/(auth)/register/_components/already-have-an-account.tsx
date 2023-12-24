import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function AlreadyHaveAnAccount() {
  return (
    <div className="flex items-center gap-x-2">
      <p>Already have an account?</p>
      <Link href="/login" className="flex items-center text-blue-700">
        <span>Sign in</span>
        <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
