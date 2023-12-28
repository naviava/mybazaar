"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useDropzone } from "react-dropzone";
import { useNotificationBanner } from "~/store/use-notification-banner";

import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { ImageDropzone } from "~/components/image-upload-widget/image-dropzone";
import { UploadImagesButton } from "~/components/image-upload-widget/upload-images-button";

import { trpc } from "~/app/_trpc/client";
import { onFileUpload } from "~/utils/form-inputs/products/handle-file-upload";

const MAX_FILES = 4;
const APPROVED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface IProps {
  productId: string;
}

export function ProductMediaCard({ productId }: IProps) {
  const router = useRouter();
  const { showBanner } = useNotificationBanner();
  const [files, setFiles] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { data: product } = trpc.product.getProductById.useQuery(productId);

  const onDrop = (acceptedFiles: File[]) => {
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
  };
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

  const utils = trpc.useUtils();
  const { mutate: handleLinktoDB } = trpc.product.createImageUrls.useMutation({
    onError: ({ message }) => {
      setPreviewUrls([]);
      showBanner({
        message,
        type: "error",
      });
    },
    onSuccess: () => {
      setPreviewUrls([]);
      setFiles(null);
      utils.product.getProductById.invalidate(productId);
      router.refresh();
      showBanner({
        message: "Successfully uploaded images.",
        type: "success",
      });
    },
  });

  const handleFileUpload = useCallback(
    (files: File[]) => onFileUpload({ files, productId, showBanner }),
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
        <ImageDropzone
          previewUrls={previewUrls}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          disabled={isLoading}
          dbImages={product?.images.map((image) => image.imageUrl)}
        >
          Drag &apos;n&apos; drop some files here, or click to select files
        </ImageDropzone>
        {!!product && product.images.length < MAX_FILES && (
          <UploadImagesButton disabled={isLoading} handleClick={handleClick}>
            IMPORTANT: You must upload images using this button, or they will
            not be saved once you leave this page.
          </UploadImagesButton>
        )}
      </div>
    </AdminFormWrapper>
  );
}
