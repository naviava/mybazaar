import { Loader } from "lucide-react";
import { cn } from "~/lib/utils";

interface IProps {
  className?: string;
  side?: "left" | "right";
}

export function LoaderSpinner({ className, side = "left" }: IProps) {
  return (
    <Loader
      className={cn(
        "h-4 w-4 animate-spin",
        side === "left" ? "mr-2" : "ml-2",
        className,
      )}
    />
  );
}
