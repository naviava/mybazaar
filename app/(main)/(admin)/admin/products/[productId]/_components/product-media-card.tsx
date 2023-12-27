"use client";

import { useCallback, useEffect, useState } from "react";

import { v4 as uuid } from "uuid";
import { useDropzone } from "react-dropzone";

import { Button } from "~/components/ui/button";
import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { uploadToS3 } from "~/lib/s3-client";
import { trpc } from "~/app/_trpc/client";

interface IProps {
  productId: string;
}

export function ProductMediaCard({ productId }: IProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
    const updatedImageUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setImageUrls((prevImages) => [...prevImages, ...updatedImageUrls]);
  }, [acceptedFiles]);

  const handleClick = useCallback(() => {
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const buffer = reader.result;
        const mimeType = file.type;
        const extension = file.name.split(".").pop();
        const newFileName = `${uuid()}-${Date.now()}.${extension}`;
        const uploadKey = `products/${productId}/${newFileName}`;
      };
      reader.readAsArrayBuffer(file);
    });
  }, [files, productId]);

  return (
    <AdminFormWrapper title="Media">
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-3">
          {imageUrls.map((imageUrl) => (
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
          <input {...getInputProps()} accept="image/png, image/jpeg" />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
        <div className="space-y-1">
          <Button
            type="button"
            variant="amazon"
            onClick={handleClick}
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
