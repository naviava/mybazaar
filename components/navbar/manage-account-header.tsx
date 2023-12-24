"use client";

import { useState } from "react";
import Link from "next/link";

import { format } from "date-fns";
import { Loader } from "lucide-react";

import { Button } from "~/components/ui/button";
import { trpc } from "~/app/_trpc/client";

export function ManageAccountHeader() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = trpc.user.getAuthProfile.useQuery();

  return (
    <div className="space-y-2">
      {!user ? (
        <>
          <Button
            asChild
            variant="amazon"
            onClick={() => setIsLoading(true)}
            className="w-full"
          >
            <Link href="/login">
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Link>
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
