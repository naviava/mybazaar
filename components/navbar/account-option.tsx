import Link from "next/link";

interface IProps {
  label: string;
  href: string;
}

export function AccountOption({ label, href }: IProps) {
  return (
    <li className="link py-1 text-sm md:text-base">
      <Link href={href}>{label}</Link>
    </li>
  );
}
