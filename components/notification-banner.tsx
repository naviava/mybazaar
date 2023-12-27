"use client";

import { CheckCircle, X, XCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import { useNotificationBanner } from "~/store/use-notification-banner";

interface IProps {}

export function NotificationBanner({}: IProps) {
  const { message, type, showBanner, hideBanner } = useNotificationBanner(
    (state) => state,
  );

  return (
    <div
      className={cn(
        "w-full justify-between rounded-md border border-black px-4 py-1.5",
        type === "hidden" ? "hidden" : "flex items-center",
        type === "success" && "border-emerald-700 bg-emerald-500/20",
        type === "error" && "border-rose-700 bg-rose-500/20",
      )}
    >
      <div
        className={cn(
          "flex items-center",
          type === "success" && "text-emerald-800",
          type === "error" && "text-rose-800",
        )}
      >
        {type === "success" && <CheckCircle className="mr-2 h-4 w-4" />}
        {type === "error" && <XCircle className="mr-2 h-4 w-4" />}
        <span className="text-sm">{message}</span>
      </div>
      <X onClick={hideBanner} className="h-4 w-4 cursor-pointer" />
    </div>
  );
}
