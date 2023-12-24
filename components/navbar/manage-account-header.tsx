import Link from "next/link";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { trpc } from "~/app/_trpc/client";

export function ManageAccountHeader() {
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  return (
    <div className="space-y-2">
      {!user ? (
        <>
          <Button asChild variant="amazon" className="w-full">
            <Link href="/login">Sign in</Link>
          </Button>
          <p className="text-center text-xs">
            New customer?{" "}
            <Link href="/register" className="text-blue-700">
              Start Here
            </Link>
          </p>
        </>
      ) : (
        <div className="space-y-1 text-center">
          <p className="text-xs font-medium">
            You&apos;ve been a member of My Bazaar since{" "}
          </p>
          <p className="text-sm font-semibold">
            {format(new Date(user.createdAt), "MMMM do, yyyy")}
          </p>
        </div>
      )}
    </div>
  );
}
