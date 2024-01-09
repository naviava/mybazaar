import { Button } from "~/components/ui/button";

interface IProps {
  children: React.ReactNode;
  action: () => void;
  disabled?: boolean;
}

export function CartActionButton({
  children,
  action,
  disabled = false,
}: IProps) {
  return (
    <Button
      variant="link"
      size="sm"
      disabled={disabled}
      onClick={action}
      className="h-5 px-3 text-sky-800"
    >
      {children}
    </Button>
  );
}
