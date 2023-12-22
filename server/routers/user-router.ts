import { router } from "~/server/trpc";
import { getAuthProfile } from "~/utils/trpc/users/get-auth-profile";

export const userRouter = router({
  getAuthProfile,
});
