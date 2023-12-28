import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { ImageActions } from "./image-actions";

interface IProps {
  url: string;
  hasActions?: boolean;
}

export function ImagePreviewCard({ url, hasActions = false }: IProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg">
      <CardContent className="p-0">
        <div className="rounded-t-lg">
          <img
            key={url}
            src={url}
            alt={url}
            className="mx-auto aspect-square w-full max-w-[300px] object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {hasActions ? (
          <ImageActions url={url} />
        ) : (
          <span className="mx-auto py-3 text-sm italic">
            Awaiting upload on save
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
