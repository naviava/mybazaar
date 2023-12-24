import Link from "next/link";

interface IProps {
  label: string;
  href: string;
}

export function AccountOption({ label, href }: IProps) {
  return (
    <li className="link py-1">
      <Link href={href}>{label}</Link>
    </li>
  );
}
