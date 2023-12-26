import Link from "next/link";

interface IProps {
  children: React.ReactNode;
  breadcrumbs?: {
    bcLabel: string;
    bcHref: string;
  }[];
}

export function Breadcrumbs({ children, breadcrumbs }: IProps) {
  return (
    <div className="flex items-center gap-x-2">
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
