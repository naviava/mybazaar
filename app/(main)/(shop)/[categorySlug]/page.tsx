import { redirect } from "next/navigation";
import { serverClient } from "~/app/_trpc/server-client";

interface IProps {
  params: {
    categorySlug: string;
  };
}

export default async function CategorySlugPage({ params }: IProps) {
  const category = await serverClient.utils.getCategoryBySlug(
    params.categorySlug,
  );
  if (!category) return redirect("/");

  return (
    <div>
      <p>{params.categorySlug}</p>
    </div>
  );
}
