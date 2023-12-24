"use client";

import { useState } from "react";
import Link from "next/link";

import { LoaderSpinner } from "~/components/loader-spinner";
import { Button } from "~/components/ui/button";

interface IProps {}

export function RegisterLink({}: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="mb-4 mt-6 flex items-center gap-x-2">
        <div className="h-[1px] flex-1 bg-neutral-300" />
        <div className="text-sm">New to My Bazaar?</div>
        <div className="h-[1px] flex-1 bg-neutral-300" />
      </div>
      <Button
        asChild
        variant="outline"
        onClick={() => setIsLoading(true)}
        className="w-full border border-gray-300 shadow-lg"
      >
        <Link href="/register">
          {isLoading && <LoaderSpinner />}
          Create your My Bazaar account
        </Link>
      </Button>
    </>
  );
}
