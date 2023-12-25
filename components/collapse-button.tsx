import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "~/components/ui/button";

interface IProps {
  toggleState: boolean;
  onClickHandler: () => void;
}

export function CollapseButton({ toggleState, onClickHandler }: IProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={onClickHandler}
      className="absolute -right-5 top-2 rounded-full border border-neutral-400 bg-neutral-200 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-500"
    >
      {toggleState ? (
        <ArrowRightFromLine className="h-4 w-4" />
      ) : (
        <ArrowLeftFromLine className="h-4 w-4" />
      )}
    </Button>
  );
}
