import { CategoryNav } from "./_components/category-nav";

interface IProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: IProps) {
  return (
    <>
      <CategoryNav />
      {children}
    </>
  );
}
