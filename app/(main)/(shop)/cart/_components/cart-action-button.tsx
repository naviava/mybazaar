import { Button } from "~/components/ui/button";

interface IProps {
  children: React.ReactNode;
  action: () => void;
}

export function CartActionButton({ children, action }: IProps) {
  return (
    <Button variant="link" size="sm" className="h-5 px-3">
      {children}
    </Button>
  );
}
