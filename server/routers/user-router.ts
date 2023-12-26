import { router } from "~/server/trpc";

import { getTempUser } from "~/utils/trpc/user/get-temp-user";
import { createTempUser } from "~/utils/trpc/user/create-temp-user";
import { getAuthProfile } from "~/utils/trpc/user/get-auth-profile";
import { verifyTempUser } from "~/utils/trpc/user/verify-temp-user";

export const userRouter = router({
  createTempUser,
  getTempUser,
  verifyTempUser,
  getAuthProfile,
});
