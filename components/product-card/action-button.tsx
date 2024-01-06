import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface IProps {
  children: React.ReactNode;
  asChild?: boolean;
  isHover?: boolean;
  productId: string;
  href?: string;
  onClick?: () => void;
}

export function ActionButton({
  children,
  asChild,
  isHover,
  productId,
  href,
  onClick,
}: IProps) {
  return (
    <Button
      asChild={asChild}
      type="button"
      variant="link"
      onClick={onClick}
      className={cn("h-8 w-8 p-0", isHover && "bg-white")}
    >
      {asChild && href ? <Link href={href}>{children}</Link> : children}
    </Button>
  );
}
