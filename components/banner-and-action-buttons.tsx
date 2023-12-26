"use client";

import { memo } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

interface IProps {
  children: React.ReactNode;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

export const BannerAndActionButtons = memo(_BannerAndActionButtons);
function _BannerAndActionButtons({
  children,
  actionLabel,
  secondaryActionHref,
  secondaryActionLabel,
}: IProps) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex-1">{children}</div>
      {secondaryActionHref && (
        <Button asChild type="button" variant="ghost" size="sm">
          <Link href={secondaryActionHref} className="hover:bg-transparent">
            {secondaryActionLabel}
          </Link>
        </Button>
      )}
      <Button type="submit" variant="amazon" size="sm" className="shadow-md">
        {actionLabel}
      </Button>
    </div>
  );
}
