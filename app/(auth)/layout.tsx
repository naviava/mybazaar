import { Logo } from "~/components/logo";

interface IProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: IProps) {
  return (
    <div className="w-full bg-white px-4 pb-10 pt-6 md:px-0">
      <div className="mx-auto max-w-md space-y-8">
        <Logo />
        {children}
      </div>
    </div>
  );
}
