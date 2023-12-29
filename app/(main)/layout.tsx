import { Navbar } from "~/components/navbar";

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
