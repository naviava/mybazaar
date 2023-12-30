import { RandomCategoryImage } from "./random-category-image";

interface IProps {
  categories: {
    name: string;
    image: string;
    href: string;
  }[];
}

export function RandomCategoryGrid({ categories }: IProps) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-4 gap-3 px-4 pb-8">
      <div className="relative col-span-4 aspect-[3.5/1] bg-neutral-400 md:aspect-[3.5/1] lg:col-span-2 lg:row-span-2 lg:aspect-square">
        <RandomCategoryImage
          src={categories[0].image}
          categoryName={categories[0].name}
          href={categories[0].href}
        />
      </div>
      <div className="relative col-span-4 aspect-[3.5/1] bg-neutral-400 md:col-span-2 md:aspect-[2/1] lg:col-span-1 lg:aspect-square">
        <RandomCategoryImage
          src={categories[1].image}
          categoryName={categories[1].name}
          href={categories[1].href}
        />
      </div>
      <div className="relative col-span-4 aspect-[3.5/1] bg-neutral-400 md:col-span-2 md:aspect-[2/1] lg:col-span-1 lg:aspect-square">
        <RandomCategoryImage
          src={categories[2].image}
          categoryName={categories[2].name}
          href={categories[2].href}
        />
      </div>
      <div className="relative col-span-4 aspect-[3.5/1] bg-neutral-400 md:aspect-[3.5/1] lg:col-span-2 lg:aspect-[2.05/1]">
        <RandomCategoryImage
          src={categories[3].image}
          categoryName={categories[3].name}
          href={categories[3].href}
        />
      </div>
    </div>
  );
}
