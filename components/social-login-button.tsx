"use client";

import { memo } from "react";
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
  return (
    <div className="flex-1">
      <Button
        variant="outline"
        onClick={() => signIn(provider, { callbackUrl: "/" })}
        className="w-full"
      >
        <Icon className="mr-2 h-6 w-6" />
        <span className="text-base">{label}</span>
      </Button>
    </div>
  );
}
