import Link from "next/link";
import { cn } from "~/lib/utils";

interface IProps {
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: {
    bcLabel: string;
    bcHref: string;
  }[];
}

export function Breadcrumbs({ children, breadcrumbs, className }: IProps) {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      {breadcrumbs &&
        breadcrumbs.map((item) => (
          <>
            <Link key={item.bcHref} href={item.bcHref} className="link">
              {item.bcLabel}
            </Link>
            <span>/</span>
          </>
        ))}
      <span>{children}</span>
    </div>
  );
}
