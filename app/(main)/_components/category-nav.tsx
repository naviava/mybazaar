import { serverClient } from "~/app/_trpc/server-client";
import { CategoryBox } from "./category-box";

export async function CategoryNav() {
  const categories = await serverClient.list.getCategories();

  return (
    <div className="mt-14 flex w-full items-center gap-x-2 overflow-x-auto bg-slate-800 px-2 text-base text-slate-200 xl:justify-center">
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
