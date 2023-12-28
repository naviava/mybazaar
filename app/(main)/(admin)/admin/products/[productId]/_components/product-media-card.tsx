"use client";

import { useCallback, useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";

import { Button } from "~/components/ui/button";
import { LoaderSpinner } from "~/components/loader-spinner";
import { AdminFormWrapper } from "~/components/admin-form-wrapper";

import { useNotificationBanner } from "~/store/use-notification-banner";

import { trpc } from "~/app/_trpc/client";
import { getS3UploadURL } from "~/lib/s3-client";
import { computeSHA256 } from "~/utils/compute-sha-256";
import { generateFileName } from "~/utils/generate-file-name";

const MAX_FILES = 4;
const APPROVED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface IProps {
  productId: string;
}

export function ProductMediaCard({ productId }: IProps) {
  const { showBanner } = useNotificationBanner();
  const [files, setFiles] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { data: product } = trpc.product.getProductById.useQuery(productId);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
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
    },
    [showBanner],
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    if (acceptedFiles.length > MAX_FILES) {
      showBanner({
        message: `You can only upload ${MAX_FILES} images at a time.`,
        type: "warning",
      });
      return;
    }
    const existingImagesCount = product?.images.length || 0;
    if (acceptedFiles.length + existingImagesCount > MAX_FILES) {
      showBanner({
        message: `You can only have ${MAX_FILES} images per product.`,
        type: "warning",
      });
      return;
    }
    setFiles(acceptedFiles);
    if (previewUrls.length > 0) {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
    const updatedPreviewUrls = acceptedFiles
      .map((file) => {
        if (!APPROVED_TYPES.includes(file.type)) {
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
  }, [acceptedFiles, product, showBanner]);

  const { mutate: handleLinktoDB } = trpc.product.createImageUrls.useMutation({
    onError: ({ message }) => {
      setPreviewUrls([]);
      showBanner({
        message,
        type: "error",
      });
    },
    onSuccess: () => {
      setFiles(null);
      showBanner({
        message: "Successfully uploaded images.",
        type: "success",
      });
    },
  });

  const handleFileUpload = useCallback(
    (files: File[]) => {
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
    },
    [showBanner, productId],
  );

  const handleClick = useCallback(async () => {
    if (!files?.length) {
      showBanner({
        message: "No files selected.",
        type: "warning",
      });
      return;
    }
    if (files.length > MAX_FILES) {
    }
    try {
      setIsLoading(true);
      const uploadedUrls = await handleFileUpload(files);
      const validUrls = uploadedUrls.filter((url): url is string =>
        Boolean(url),
      );
      handleLinktoDB({ productId, imageUrls: validUrls });
    } finally {
      setIsLoading(false);
    }
  }, [files, productId, showBanner, handleFileUpload, handleLinktoDB]);

  return (
    <AdminFormWrapper title="Media">
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {!!product &&
            !!product.images.length &&
            product.images.map((image) => (
              <img
                key={image.imageUrl}
                src={image.imageUrl}
                alt={image.imageUrl}
                className="mx-auto aspect-square w-full max-w-[300px] object-cover"
              />
            ))}
          {!!previewUrls.length &&
            previewUrls.map((imageUrl) => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={imageUrl}
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
            disabled={isLoading}
            accept="image/jpeg,image/png,image/webp,image/gif"
          />
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        </div>
        <div className="space-y-1">
          <Button
            type="button"
            variant="amazon"
            disabled={isLoading}
            onClick={handleClick}
            className="w-full"
          >
            {isLoading && <LoaderSpinner className="mr-2" />}
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
