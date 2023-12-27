"use client";

import { memo } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";

interface IProps {
  children: React.ReactNode;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  disabled?: boolean;
}

export const BannerAndActionButtons = memo(_BannerAndActionButtons);
function _BannerAndActionButtons({
  children,
  actionLabel,
  secondaryActionHref,
  secondaryActionLabel,
  disabled = false,
}: IProps) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex-1">{children}</div>
      {secondaryActionHref && (
        <Button
          asChild
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
        >
          <Link href={secondaryActionHref} className="hover:bg-transparent">
            {secondaryActionLabel}
          </Link>
        </Button>
      )}
      <Button
        type="submit"
        variant="amazon"
        size="sm"
        disabled={disabled}
        className="shadow-md"
      >
        {actionLabel}
      </Button>
    </div>
  );
}
