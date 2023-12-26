import { Separator } from "~/components/ui/separator";
import { Breadcrumbs } from "~/components/breadcrumbs";

interface IProps {
  label: string;
  currentBcLabel: string;
  breadcrumbs?: {
    bcLabel: string;
    bcHref: string;
  }[];
}

export function PageHeading({ label, currentBcLabel, breadcrumbs }: IProps) {
  return (
    <>
      <div className="space-y-2">
        {breadcrumbs && (
          <Breadcrumbs breadcrumbs={breadcrumbs}>{currentBcLabel}</Breadcrumbs>
        )}
        <h1 className="text-3xl font-bold xl:text-4xl">{label}</h1>
      </div>
      <Separator className="my-6 bg-neutral-300" />
    </>
  );
}
