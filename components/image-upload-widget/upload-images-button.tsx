import { Button } from "~/components/ui/button";
import { LoaderSpinner } from "~/components/loader-spinner";

interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  handleClick: () => Promise<void>;
}

export function UploadImagesButton({
  children,
  disabled,
  handleClick,
}: IProps) {
  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant="amazon"
        disabled={disabled}
        onClick={handleClick}
        className="w-full"
      >
        {disabled && <LoaderSpinner className="mr-2" />}
        Upload Images
      </Button>
      <p className="text-sm">{children}</p>
    </div>
  );
}
