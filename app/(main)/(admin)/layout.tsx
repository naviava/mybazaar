import { redirect } from "next/navigation";
import { DesktopSidebar } from "./_components/desktop-sidebar";
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
    <div className="flex h-full">
      <DesktopSidebar />
      {children}
    </div>
  );
}
