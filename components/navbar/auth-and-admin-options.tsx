import Link from "next/link";
import { signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";

interface IProps {
  userRole: UserRole;
}

export function AuthAndAdminOptions({ userRole }: IProps) {
  return (
    <div className="text-sm md:text-base">
      {userRole !== "USER" && (
        <div className="link py-1">
          <Link href="/admin">Admin Panel</Link>
        </div>
      )}
      <div role="button" onClick={() => signOut()} className="link py-1">
        Sign out
      </div>
    </div>
  );
}
