import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface IProps {
  label: string;
  fieldId?: string;
  value?: string;
  placeholder?: string;
  description?: string;
}

export function DisabledInput({
  label,
  fieldId,
  value,
  description,
  placeholder,
}: IProps) {
  return (
    <div>
      <Label htmlFor={fieldId} className="text-base font-normal">
        {label}
      </Label>
      <Input
        disabled
        id={fieldId}
        value={value}
        placeholder={value ? value : placeholder}
        className="mt-2 text-base placeholder:text-sm placeholder:italic"
      />
    </div>
  );
}
