import { memo } from "react";

interface IProps {
  children: React.ReactNode;
  previewUrls: string[];
  getRootProps: any;
  getInputProps: any;
  disabled?: boolean;
  dbImages?: string[] | undefined;
}

export const ImageDropzone = memo(_ImageDropzone);
function _ImageDropzone({
  children,
  dbImages,
  previewUrls,
  getRootProps,
  getInputProps,
  disabled = false,
}: IProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {!!dbImages &&
          !!dbImages.length &&
          dbImages.map((url) => (
            <img
              key={url}
              src={url}
              alt={url}
              className="mx-auto aspect-square w-full max-w-[300px] object-cover"
            />
          ))}
        {!!previewUrls.length &&
          previewUrls.map((url) => (
            <img
              key={url}
              src={url}
              alt={url}
              className="mx-auto aspect-square w-full max-w-[300px] object-cover"
            />
          ))}
      </div>
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border border-dashed border-neutral-500 p-6"
      >
        <input
          {...getInputProps()}
          id="file-upload"
          type="file"
          multiple
          disabled={disabled}
          accept="image/jpeg,image/png,image/webp,image/gif"
        />
        <div>{children}</div>
      </div>
    </>
  );
}
