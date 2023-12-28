"use client";

import { memo, useMemo } from "react";
import { useRouter } from "next/navigation";

import { Eye, Trash2 } from "lucide-react";
import { useNotificationBanner } from "~/store/use-notification-banner";

import { Separator } from "~/components/ui/separator";
import ConfirmModal from "~/components/modals/confirm-modal";

import { trpc } from "~/app/_trpc/client";

interface IProps {
  url: string;
}

export const ImageActions = memo(_ImageActions);
function _ImageActions({ url }: IProps) {
  const router = useRouter();
  const { showBanner } = useNotificationBanner((state) => state);

  const strArray = useMemo(() => url.replace("https://", "").split("/"), [url]);
  strArray.shift();
  const imageKey = useMemo(() => strArray.join("/"), [strArray]);

  const { mutate: handleDelete } = trpc.product.deleteImage.useMutation({
    onError: ({ message }) => {
      showBanner({
        message,
        type: "error",
      });
    },
    onSuccess: () => {
      router.refresh();
      showBanner({
        message: "Image deleted successfully",
        type: "success",
      });
    },
  });

  return (
    <div className="flex w-full items-center">
      {/* TODO: Click handler to open image modal. */}
      <div
        role="button"
        className="group flex flex-1 justify-center rounded-bl-lg py-3 transition hover:bg-neutral-200/70"
      >
        <Eye className="h-5 w-5 text-muted-foreground transition group-hover:text-sky-700" />
      </div>
      <Separator orientation="vertical" className="h-7" />
      <ConfirmModal onConfirm={() => handleDelete({ url, imageKey })}>
        <div
          role="button"
          onClick={(url) => {}}
          className="group flex flex-1 justify-center py-3 transition hover:bg-neutral-200/70"
        >
          <Trash2 className="h-5 w-5 text-rose-500 transition group-hover:text-rose-700" />
        </div>
      </ConfirmModal>
    </div>
  );
}
