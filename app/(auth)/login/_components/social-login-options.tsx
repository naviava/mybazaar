"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SocialLoginButton } from "~/components/social-login-button";

export function SocialLoginOptions() {
  return (
    <div className="mt-3 space-y-3">
      <p className="text-center text-sm">or login, using</p>
      <div className="flex items-center gap-x-4">
        <SocialLoginButton provider="google" label="Google" icon={FcGoogle} />
        <SocialLoginButton provider="github" label="GitHub" icon={FaGithub} />
      </div>
    </div>
  );
}
