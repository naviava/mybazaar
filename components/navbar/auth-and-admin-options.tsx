import { memo } from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";

interface IProps {
  userRole: UserRole;
  handleClose?: () => void;
}

export const AuthAndAdminOptions = memo(_AuthAndAdminOptions);
function _AuthAndAdminOptions({ userRole, handleClose }: IProps) {
  return (
    <div className="text-sm md:text-base">
      {userRole !== "USER" && (
        <div onClick={handleClose} className="link py-1">
          <Link href="/admin">Admin Panel</Link>
        </div>
      )}
      <div
        role="button"
        onClick={() => {
          handleClose?.();
          signOut();
        }}
        className="link py-1"
      >
        Sign out
      </div>
    </div>
  );
}
