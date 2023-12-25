import Link from "next/link";
import { IconType } from "react-icons";
import { ChevronsRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface IProps {
  label: string;
  href: string;
  icon: IconType;
  iconColor?: string;
}

export function ManageOptionItem({
  href,
  label,
  icon: Icon,
  iconColor,
}: IProps) {
  const iconColorString = iconColor ?? `text-[${iconColor}]`;

  return (
    <li className="flex w-fit items-center px-10">
      <Button
        asChild
        variant="link"
        className="text-lg text-blue-900 xl:text-xl"
      >
        <Link href={href} className="flex w-fit items-center">
          <Icon
            className={cn(
              "mr-2 h-5 w-5 xl:mr-3 xl:h-6 xl:w-6",
              iconColorString,
            )}
          />
          {label}
          <ChevronsRight className="ml-2 h-4 w-4 xl:h-5 xl:w-5" />
        </Link>
      </Button>
    </li>
  );
}
