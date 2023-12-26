import Link from "next/link";

interface IProps {
  children: React.ReactNode;
  rootLabel: string;
  rootHref: string;
}

export function Breadcrumbs({ children, rootLabel, rootHref }: IProps) {
  return (
    <div className="flex items-center gap-x-2">
      <Link href={rootHref} className="link">
        {rootLabel}
      </Link>
      <span>/</span>
      <span>{children}</span>
    </div>
  );
}
