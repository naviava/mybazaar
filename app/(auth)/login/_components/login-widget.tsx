import { CredentialsLoginCard } from "./credentials-login-card";
import { SocialLoginOptions } from "./social-login-options";

export function LoginWidget() {
  return (
    <>
      <CredentialsLoginCard />
      <SocialLoginOptions />
    </>
  );
}
