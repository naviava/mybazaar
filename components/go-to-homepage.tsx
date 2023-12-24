import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function GoToHomepage() {
  return (
    <Link href="/" className="flex items-center text-sm text-blue-700">
      <ChevronLeft className="mr-1 h-3 w-3" />
      <span className="hover:underline">Go to homepage</span>
    </Link>
  );
}
