import { Navbar } from "~/components/navbar";
import { CategoryNav } from "./_components/category-nav";

interface IProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IProps) {
  return (
    <main className="h-full">
      <Navbar />
      <CategoryNav />
      {children}
    </main>
  );
}