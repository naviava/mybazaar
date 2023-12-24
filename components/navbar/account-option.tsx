import Link from "next/link";

interface IProps {
  label: string;
  href: string;
  handleClose?: () => void;
}

export function AccountOption({ label, href, handleClose }: IProps) {
  return (
    <li onClick={handleClose} className="link py-1 text-sm md:text-base">
      <Link href={href}>{label}</Link>
    </li>
  );
}
