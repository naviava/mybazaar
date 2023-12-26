import { Separator } from "~/components/ui/separator";
import { Breadcrumbs } from "~/components/breadcrumbs";

interface IProps {
  label: string;
  breadcrumbs?: {
    rootLabel: string;
    rootHref: string;
    currentPageLabel: string;
  };
}

export function PageHeading({ label, breadcrumbs }: IProps) {
  return (
    <>
      <div className="space-y-2">
        {breadcrumbs && (
          <Breadcrumbs
            rootLabel={breadcrumbs.rootLabel}
            rootHref={breadcrumbs.rootHref}
          >
            {breadcrumbs.currentPageLabel}
          </Breadcrumbs>
        )}
        <h1 className="text-3xl font-bold xl:text-4xl">{label}</h1>
      </div>
      <Separator className="my-6 bg-neutral-300" />
    </>
  );
}
