import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { ImageActions } from "./image-actions";

interface IProps {
  url: string;
  hasActions?: boolean;
}

export function ImagePreviewCard({ url, hasActions = false }: IProps) {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardContent className="p-0">
        <img
          key={url}
          src={url}
          alt={url}
          className="mx-auto aspect-square w-full max-w-[300px] rounded-t-lg object-cover"
        />
      </CardContent>
      <CardFooter className="p-0">
        {hasActions ? (
          <ImageActions url={url} />
        ) : (
          <span className="mx-auto py-3 text-sm italic">Upload pending...</span>
        )}
      </CardFooter>
    </Card>
  );
}
