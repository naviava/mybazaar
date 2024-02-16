import { ColorPicker } from "~/components/color-picker";

interface IProps {}

export function ProductSelection({}: IProps) {
  return (
    <div className="flex items-center">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-x-6">
          <p className="font-medium">COLOR</p>
          <ColorPicker />
        </div>
        <div>Quantity</div>
      </div>
      <div className="flex flex-1 flex-col items-end justify-center">
        <div>Price</div>
        <div>Button</div>
      </div>
    </div>
  );
}
