import Link from "next/link";

interface IProps {
  label: string;
  href: string;
}

export function CategoryBox({ label, href }: IProps) {
  return (
    <Link href={href} className="shrink-0 px-3 py-3 font-medium">
      {label}
    </Link>
  );
}
