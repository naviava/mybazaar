"use client";

import { useCallback, useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";

import { Button } from "~/components/ui/button";
import { AdminFormWrapper } from "~/components/admin-form-wrapper";

import { useNotificationBanner } from "~/store/use-notification-banner";
import { getS3UploadURL } from "~/lib/s3-client";
import { computeSHA256 } from "~/utils/compute-sha-256";
import { generateFileName } from "~/utils/generate-file-name";

const acceptedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

interface IProps {
  productId: string;
}

export function ProductMediaCard({ productId }: IProps) {
  const { showBanner } = useNotificationBanner();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (!acceptedFileTypes.includes(file.type)) {
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
    },
    [showBanner],
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    setFiles(acceptedFiles);
    if (previewUrls.length > 0) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
    const updatedPreviewUrls = acceptedFiles
      .map((file) => {
        if (!acceptedFileTypes.includes(file.type)) {
          return;
        } else {
          return URL.createObjectURL(file);
        }
      })
      .filter((url): url is string => Boolean(url));
    setPreviewUrls(updatedPreviewUrls);
    /**
     * previewUrls is deliberately excluded from the dependency
     * array, as it will cause an infinite loop.
     */
  }, [acceptedFiles]);

  const handleFileUpload = useCallback(async () => {
    setIsLoading(true);
    if (!files?.length) {
      showBanner({
        message: "No files selected.",
        type: "warning",
      });
      return;
    }
    try {
      files.forEach(async (file) => {
        const signedUrl = await getS3UploadURL({
          key: file.name,
          fileType: file.type,
          fileSize: file.size,
          checksum: await computeSHA256(file),
        });
        await fetch(signedUrl, {
          headers: { "Content-Type": file.type },
          method: "PUT",
          body: file,
        });
        setUploadedImageUrls((prev) => [...prev, signedUrl.split("?")[0]]);
      });
    } catch (error) {
      showBanner({
        message: "Something went wrong. Refresh the page and try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [showBanner, files]);

  useEffect(() => console.log(uploadedImageUrls), [uploadedImageUrls]);

  return (
    <AdminFormWrapper title="Media">
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-3">
          {!!previewUrls.length &&
            previewUrls.map((imageUrl) => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={imageUrl}
                className="aspect-square w-full object-cover"
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
            disabled={isLoading}
            accept="image/jpeg,image/png,image/webp,image/gif"
          />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
        <div className="space-y-1">
          <Button
            type="button"
            variant="amazon"
            onClick={handleFileUpload}
            className="w-full"
          >
            Upload Images
          </Button>
          <p className="text-sm">
            IMPORTANT: You must upload images using this button, or they will
            not be saved once you leave this page.
          </p>
        </div>
      </div>
    </AdminFormWrapper>
  );
}
