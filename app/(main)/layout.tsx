import { Navbar } from "~/components/navbar";
import { CategoryNav } from "./_components/category-nav";
import { Suspense } from "react";

interface IProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IProps) {
  return (
    <main>
      <Navbar />
      <Suspense fallback={"Loading..."}>
        <CategoryNav />
      </Suspense>
      {children}
    </main>
  );
}
