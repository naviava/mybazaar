import Link from "next/link";
import { Button } from "~/components/ui/button";

interface IProps {
  label: string;
  href: string;
}

export function CategoryBox({ label, href }: IProps) {
  return (
    <Button asChild variant="link" className="text-slate-200">
      <Link href={href} className="shrink-0 font-medium">
        {label}
      </Link>
    </Button>
  );
}
