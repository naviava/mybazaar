import { AllItemsCart } from "./_components/all-items-cart";
import { CartSubtotalCard } from "./_components/cart-subtotal-card";

export default function CartPage() {
  return (
    <div className="mx-auto px-2 md:px-4">
      <article className="mx-auto flex max-w-[95%] justify-center gap-x-4 pt-2 md:pt-4 xl:max-w-7xl">
        <AllItemsCart />
        <CartSubtotalCard />
      </article>
    </div>
  );
}
