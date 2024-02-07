import { Check } from "lucide-react";

interface IProps {}

export function ColorPicker({}: IProps) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500">
        {<Check className="h-4 w-4 text-white" />}
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500">
        {<Check className="h-4 w-4 text-white" />}
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500">
        {<Check className="h-4 w-4 text-white" />}
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500">
        {<Check className="h-4 w-4 text-white" />}
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-500">
        {<Check className="h-4 w-4 text-white" />}
      </div>
    </div>
  );
}
