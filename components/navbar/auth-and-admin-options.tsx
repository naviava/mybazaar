import { UserRole } from "@prisma/client";
import { signOut } from "next-auth/react";

interface IProps {
  userRole: UserRole;
}

export function AuthAndAdminOptions({ userRole }: IProps) {
  return (
    <>
      {userRole !== "USER" && <div className="link py-1">Admin Panel</div>}
      <div onClick={() => signOut()} className="link py-1">
        Sign out
      </div>
    </>
  );
}
