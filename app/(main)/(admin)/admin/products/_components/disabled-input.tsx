import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface IProps {
  label: string;
  value?: string;
  placeholder?: string;
  description?: string;
}

export function DisabledInput({
  label,
  value,
  description,
  placeholder,
}: IProps) {
  return (
    <div>
      <Label htmlFor="sku-input" className="text-base font-normal">
        {label}
      </Label>
      <Input
        disabled
        id="sku-input"
        value={value}
        placeholder={value ? value : placeholder}
        className="mt-2 text-base placeholder:text-sm placeholder:italic"
      />
    </div>
  );
}
