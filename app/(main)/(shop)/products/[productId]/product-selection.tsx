import { ColorPicker } from "~/components/color-picker";

interface IProps {}

export function ProductSelection({}: IProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className="grid grid-cols-1 lg:col-span-2 lg:grid-cols-2">
        <div className="grid grid-cols-2">
          <p className="font-medium">COLOR</p>
          <ColorPicker />
        </div>
        <div>Quantity</div>
      </div>
      <div>
        <div>Price</div>
        <div>Button</div>
      </div>
    </div>
  );
}
