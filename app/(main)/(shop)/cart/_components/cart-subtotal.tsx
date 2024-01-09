"use client";

import { useCart } from "~/hooks/use-cart";

export function CartSubtotal() {
  const { totalPrice, totalQuantity } = useCart({});

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-lg font-medium">{`Subtotal (${totalQuantity} items):`}</p>
      <p className="text-xl font-semibold">{totalPrice}</p>
    </div>
  );
}
