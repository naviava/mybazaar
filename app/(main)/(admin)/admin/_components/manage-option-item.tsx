import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface IProps {
  label: string;
  href: string;
}

export function ManageOptionItem({ href, label }: IProps) {
  return (
    <li className="flex w-fit items-center px-10">
      <Button asChild variant="link" className="text-lg text-blue-900">
        <Link href={href} className="flex w-fit items-center">
          {label}
          <ChevronsRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </li>
  );
}
