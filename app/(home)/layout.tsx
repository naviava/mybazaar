import { Navbar } from "~/components/navbar";

interface IProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: IProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
