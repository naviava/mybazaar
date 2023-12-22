import { serverClient } from "~/app/_trpc/server-client";

export default async function Home() {
  const user = await serverClient.users.getAuthProfile();

  console.log(user);

  return <div>Hello World!</div>;
}
