import { serverClient } from "~/app/_trpc/server-client";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface Props {
  user: Awaited<ReturnType<typeof serverClient.users.getAuthProfile>>;
}

export function ManageAccount({ user }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Button variant="amazon" className="w-full">
          Sign in
        </Button>
        <p className="text-center text-xs">
          New customer? <span className="">Start Here</span>
        </p>
      </div>
      <Separator className="my-2" />
      <div>A</div>
    </>
  );
}
