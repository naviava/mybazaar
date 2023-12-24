import { ChevronDown } from "lucide-react";

interface IProps {
  userName: string | undefined;
}

export function UserMenuTrigger({ userName }: IProps) {
  return (
    <>
      <div className="text-left text-xs md:text-sm">
        Hello, {userName ? userName : "sign in"}
      </div>
      <div className="flex items-center text-sm font-semibold">
        Manage Account
        <ChevronDown className="ml-1 h-4 w-4" />
      </div>
    </>
  );
}
