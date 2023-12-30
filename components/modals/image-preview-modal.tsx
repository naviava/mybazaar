import { memo } from "react";
import { ExternalLink } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

import { cn } from "~/lib/utils";
import Image from "next/image";

interface IProps {
  children: React.ReactNode;
  imageUrl: string;
  className?: string;
}

export const ImagePreviewModal = memo(_ImagePreviewModal);
function _ImagePreviewModal({ children, imageUrl, className }: IProps) {
  return (
    <Dialog>
      <DialogTrigger className={cn(className)}>{children}</DialogTrigger>
      <DialogContent className="rounded-sm p-0 md:max-w-[800px]">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="link mx-auto mt-4 w-fit"
        >
          <a
            href={imageUrl}
            target="_blank"
            className="flex items-center text-muted-foreground"
          >
            Open image in new tab
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <div className="relative h-[512px] w-[510px] transition-all duration-200 md:h-[800px] md:w-[798px]">
          <Image
            fill
            src={imageUrl}
            alt="Product Image Preview"
            className="rounded-b-lg object-cover transition-all"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
