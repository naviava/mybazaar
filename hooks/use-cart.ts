import { useMemo } from "react";
import { toast } from "sonner";
import { CartItemWithProduct } from "~/types";
import { trpc } from "~/app/_trpc/client";
import { getCartTotals } from "~/utils";

interface IProps {
  productId?: string;
}

export function useCart({ productId }: IProps) {
  const utils = trpc.useUtils();

  const { data: cart, isLoading: isFetchingCart } =
    trpc.cart.getCart.useQuery();

  let cartItem: CartItemWithProduct | undefined;
  let isFetchingCartItem = false;
  if (!!productId) {
    const { data, isLoading } = trpc.cart.getCartItem.useQuery(productId);
    cartItem = data;
    isFetchingCartItem = isLoading;
  }

  const { mutate: modifyCart, isLoading: loading01 } =
    trpc.cart.modifyCart.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: () => {
        utils.cart.getCart.invalidate();
        toast.success("Cart updated!");
      },
    });

  const { mutate: removeItemFromCart, isLoading: loading02 } =
    trpc.cart.removeItemFromCart.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (message) => {
        utils.cart.getCart.invalidate();
        toast.success(message);
      },
    });

  const { mutate: clearCart, isLoading: loading03 } =
    trpc.cart.clearCart.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (message) => {
        utils.cart.getCart.invalidate();
        utils.cart.getCartItem.getData();
        toast.success(message);
      },
    });

  const { totalPrice, totalQuantity } = getCartTotals(cart?.items || []);

  const isLoading = loading01 || loading02 || loading03;

  return {
    cart,
    cartItem,
    totalPrice,
    totalQuantity,
    isLoading,
    isFetchingCart,
    isFetchingCartItem,
    modifyCart,
    removeItemFromCart,
    clearCart,
  };
}
