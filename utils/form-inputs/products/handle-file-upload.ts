import { getS3UploadURL } from "~/lib/s3-client";
import { computeSHA256 } from "~/utils/compute-sha-256";
import { generateFileName } from "~/utils/generate-file-name";

import { BannerType } from "~/store/use-notification-banner";

type HandleFileUploadProps = {
  files: File[];
  productId: string;
  showBanner: ({
    message,
    type,
  }: {
    message: string;
    type: BannerType;
  }) => void;
};

export function onFileUpload({
  productId,
  files,
  showBanner,
}: HandleFileUploadProps) {
  const uploadPromises = files.map(async (file) => {
    try {
      const signedUrl = await getS3UploadURL({
        key: `products/${productId}/${await generateFileName()}.${
          file.name.split(".").pop() || "jpg"
        }`,
        fileType: file.type,
        fileSize: file.size,
        checksum: await computeSHA256(file),
      });
      const response = await fetch(signedUrl, {
        headers: { "Content-Type": file.type },
        method: "PUT",
        body: file,
      });
      if (!response.ok) {
        showBanner({
          message: "Something went wrong. Refresh the page and try again.",
          type: "error",
        });
        return null;
      } else {
        const uploadedUrl = signedUrl.split("?")[0];
        return uploadedUrl;
      }
    } catch (error) {
      showBanner({
        message: "Something went wrong. Refresh the page and try again.",
        type: "error",
      });
      return null;
    }
  });

  return Promise.all(uploadPromises);
}
