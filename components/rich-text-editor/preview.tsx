"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";
import { cn } from "~/lib/utils";

interface PreviewProps {
  value: string;
}

export default function Preview({ value }: PreviewProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    [],
  );

  return (
    <ReactQuill
      theme="bubble"
      value={value || "No description provided yet."}
      readOnly
      className={cn(!value && "italic text-muted-foreground")}
    />
  );
}
