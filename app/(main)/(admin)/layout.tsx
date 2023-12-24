import { redirect } from "next/navigation";
import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: IProps) {
  const user = await serverClient.user.getAuthProfile();
  if (!!user && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return redirect("/");
  }

  return (
    <div className="mx-auto max-w-7xl p-4 lg:py-6">
      <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
        Manage Your Shop
      </h1>
      <div className="mt-2 rounded-sm border border-neutral-400 lg:mt-4">
        {children}
      </div>
    </div>
  );
}
