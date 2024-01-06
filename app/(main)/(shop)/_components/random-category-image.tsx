import Link from "next/link";
import Image from "next/image";

interface IProps {
  src: string;
  alt?: string;
  categoryName: string;
  href: string;
}

export function RandomCategoryImage({
  src,
  alt = "Category Image",
  categoryName,
  href,
}: IProps) {
  return (
    <Link href={href} className="h-full w-full">
      <Image fill src={src} alt={alt} className="object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute bottom-2 left-2 text-3xl font-semibold uppercase text-white">
        {categoryName}
      </div>
    </Link>
  );
}
