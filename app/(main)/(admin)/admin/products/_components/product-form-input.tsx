import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ProductFormSchemaType } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  form: ProductFormSchemaType;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  fieldName: "name" | "price" | "discountPct" | "stockCount";
}

export function ProductFormInput({
  form,
  label,
  placeholder,
  description,
  disabled = false,
  fieldName,
}: IProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={disabled}
              placeholder={placeholder ? placeholder : ""}
              className="text-base"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
