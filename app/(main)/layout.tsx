import { Navbar } from "~/components/navbar";
import { CategoryNav } from "./(shop)/_components/category-nav";

interface IProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IProps) {
  return (
    <main className="h-full">
      <Navbar />
      {children}
    </main>
  );
}
