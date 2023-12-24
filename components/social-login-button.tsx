"use client";

import { memo, useCallback, useState } from "react";

import { Loader } from "lucide-react";
import { IconType } from "react-icons";
import { signIn } from "next-auth/react";

import { Button } from "~/components/ui/button";

interface IProps {
  provider: string;
  label: string;
  icon: IconType;
}

export const SocialLoginButton = memo(_SocialLoginButton);
function _SocialLoginButton({ provider, label, icon: Icon }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: "/" });
  }, [provider]);

  return (
    <div className="flex-1">
      <Button variant="outline" onClick={handleClick} className="w-full">
        <Icon className="mr-2 h-6 w-6" />
        <span className="text-base">{label}</span>
        {isLoading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </div>
  );
}
