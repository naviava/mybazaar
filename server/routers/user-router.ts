import { router } from "~/server/trpc";
import { createTempUser } from "~/utils/trpc/users/create-temp-user";
import { getAuthProfile } from "~/utils/trpc/users/get-auth-profile";

export const userRouter = router({
  getAuthProfile,
  createTempUser,
});
