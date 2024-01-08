"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  label: string;
  href: string;
  handleClose?: () => void;
}

export function AccountOption({ label, href, handleClose }: IProps) {
  const router = useRouter();

  return (
    <li
      onClick={() => {
        router.push(href);
        handleClose && handleClose();
      }}
      className="link py-1 text-sm md:text-base"
    >
      <p>{label}</p>
    </li>
  );
}
