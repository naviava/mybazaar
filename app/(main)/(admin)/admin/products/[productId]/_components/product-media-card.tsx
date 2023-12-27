"use client";

import Dropzone, { useDropzone } from "react-dropzone";
import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

import { AdminFormWrapper } from "~/components/admin-form-wrapper";
import { FormControl, FormField, FormItem } from "~/components/ui/form";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

interface IProps {
  form: ProductFormSchemaType;
  productId: string;
  fieldName: "images";
  type?: "file";
  disabled?: boolean;
}

export function ProductMediaCard({
  form,
  fieldName,
  productId,
  disabled = false,
  type = "file",
}: IProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length <= 4) {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            console.log(binaryStr);
          };
          reader.readAsArrayBuffer(file);
        });
      } else {
        toast.error("You can only upload 4 images");
      }
    },
    [files.length],
  );
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

  return (
    <AdminFormWrapper title="Media">
      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-3">
          {imageUrls.map((imageUrl) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={imageUrl}
              className="aspect-square w-full object-contain"
            />
          ))}
        </div>
        <div
          {...getRootProps()}
          className="cursor-pointer rounded-lg border border-dashed border-neutral-500 p-6"
        >
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
        <div className="space-y-1">
          <Button type="button" variant="amazon" className="w-full">
            Upload Images
          </Button>
          <p className="text-sm">
            IMPORTANT: You must upload images using this button.
          </p>
        </div>
      </div>
    </AdminFormWrapper>
  );
}
