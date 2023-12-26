import { Separator } from "~/components/ui/separator";

interface IProps {}

export function PageHeading({}: IProps) {
  return (
    <>
      <div className="space-y-2">
        <div>Breadcrumbs</div>
        <h1>Add Product</h1>
      </div>
      <Separator className="my-6 bg-neutral-300" />
    </>
  );
}
