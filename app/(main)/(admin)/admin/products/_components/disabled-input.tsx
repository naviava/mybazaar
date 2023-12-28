import { trpc } from "~/app/_trpc/client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface IProps {
  label: string;
  productId: string;
  fieldId: "sku";
  placeholder?: string;
  description?: string;
}

export function DisabledInput({
  label,
  fieldId,
  productId,
  description,
  placeholder,
}: IProps) {
  const { data: product } = trpc.product.getProductById.useQuery(productId);
  const fieldValue = product && product[fieldId];

  return (
    <div>
      <Label htmlFor={fieldId} className="text-base font-normal">
        {label}
      </Label>
      <Input
        disabled
        id={fieldId}
        value={fieldValue}
        placeholder={fieldValue ? "" : placeholder}
        className="mt-2 text-base placeholder:text-sm placeholder:italic"
      />
    </div>
  );
}
