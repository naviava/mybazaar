import { router } from "~/server/trpc";

import { getTempUser } from "~/utils/trpc/users/get-temp-user";
import { createTempUser } from "~/utils/trpc/users/create-temp-user";
import { getAuthProfile } from "~/utils/trpc/users/get-auth-profile";

export const userRouter = router({
  createTempUser,
  getTempUser,
  getAuthProfile,
});
