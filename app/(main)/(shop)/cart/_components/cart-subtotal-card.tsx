import { Button } from "~/components/ui/button";
import { CartSubtotal } from "./cart-subtotal";

interface IProps {}

export function CartSubtotalCard({}: IProps) {
  return (
    <section className="hidden h-fit w-[300px] space-y-4 bg-white p-4 lg:block">
      <CartSubtotal />
      <Button variant="amazon" className="w-full rounded-xl">
        Proceed to Buy
      </Button>
    </section>
  );
}
