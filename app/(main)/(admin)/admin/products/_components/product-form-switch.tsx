import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
  label?: string;
  description?: string;
  disabled?: boolean;
  fieldName: "isAvailable";
}

export function ProductFormSwitch({
  form,
  label,
  description,
  fieldName,
  disabled = false,
}: IProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-base font-normal">{label}</FormLabel>
          )}
          <FormControl></FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
