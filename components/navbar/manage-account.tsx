import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";

export function ManageAccount() {
  return (
    <>
      <div className="space-y-2">
        <Button asChild variant="amazon" className="w-full">
          <Link href="/login">Sign in</Link>
        </Button>
        <p className="text-center text-xs">
          New customer?{" "}
          <Link href="/register" className="text-blue-700">
            Start Here
          </Link>
        </p>
      </div>
      <Separator className="my-2" />
      <div>A</div>
    </>
  );
}
