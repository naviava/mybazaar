import { BannerType } from "~/store/use-notification-banner";

const APPROVED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

type THandleDragDropProps = {
  acceptedFiles: File[];
  showBanner: ({
    message,
    type,
  }: {
    message: string;
    type: BannerType;
  }) => void;
};

export function handleDragDropImage({
  acceptedFiles,
  showBanner,
}: THandleDragDropProps) {
  acceptedFiles.forEach((file) => {
    if (!APPROVED_TYPES.includes(file.type)) {
      showBanner({
        message: "Invalid file type. Please upload an image.",
        type: "warning",
      });
    } else {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.readAsArrayBuffer(file);
    }
  });
}
