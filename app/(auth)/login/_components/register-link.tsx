"use client";

import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";

interface IProps {}

export function RegisterLink({}: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      asChild
      variant="outline"
      onClick={() => setIsLoading(true)}
      className="w-full border border-gray-300 shadow-lg"
    >
      <Link href="/register">
        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        Create your My Bazaar account
      </Link>
    </Button>
  );
}
