import { serverClient } from "~/app/_trpc/server-client";
import { CategoryBox } from "./category-box";

export async function CategoryNav() {
  const categories = await serverClient.utils.getCategories();

  return (
    <div className="mt-14 flex w-full items-center gap-x-2 overflow-x-auto bg-sky-950 px-2 xl:justify-center">
      {categories.map((category) => (
        <CategoryBox
          key={category.id}
          label={category.name.replaceAll(" and ", " & ")}
          href={`/${category.slug}`}
        />
      ))}
    </div>
  );
}
