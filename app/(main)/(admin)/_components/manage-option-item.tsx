import Link from "next/link";
import { IconType } from "react-icons";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface IProps {
  label: string;
  href: string;
  icon: IconType;
  color: string;
}

export function ManageOptionItem({ href, label, icon: Icon, color }: IProps) {
  return (
    <li className="flex w-fit items-center">
      <Button
        asChild
        variant="link"
        className={cn("text-lg xl:text-xl", color)}
      >
        <Link href={href} className="flex w-fit items-center">
          <Icon className="mr-2 h-5 w-5 xl:mr-3 xl:h-6 xl:w-6" />
          {label}
        </Link>
      </Button>
    </li>
  );
}
