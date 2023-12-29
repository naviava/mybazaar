import { Dispatch, SetStateAction } from "react";

import { Button } from "~/components/ui/button";
import { LoaderSpinner } from "~/components/loader-spinner";

interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  handleClick: () => Promise<void>;
  setPreviewUrls: (newUrls: string[]) => void;
}

export function UploadImagesButton({
  children,
  disabled,
  handleClick,
  setPreviewUrls,
}: IProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-x-4">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => setPreviewUrls([])}
          className="w-full"
        >
          Reset
        </Button>
        <Button
          type="button"
          variant="amazon"
          disabled={disabled}
          onClick={handleClick}
          className="w-full"
        >
          {disabled && <LoaderSpinner className="mr-2" />}
          Save
        </Button>
      </div>
      <p className="text-sm">{children}</p>
    </div>
  );
}
