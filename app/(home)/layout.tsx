import { Navbar } from "~/components/navbar";

interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
