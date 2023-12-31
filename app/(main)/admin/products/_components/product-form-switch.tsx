import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";
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
        <FormItem className="flex items-center justify-between">
          {label && (
            // TODO: Add information hover tooltip.
            <FormLabel className="text-base font-normal">{label}</FormLabel>
          )}
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="data-[state=checked]:bg-sky-600"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
