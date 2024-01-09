import { useMemo } from "react";
import { toast } from "sonner";
import { trpc } from "~/app/_trpc/client";

interface IProps {
  productId?: string;
}

export function useWishlist({ productId }: IProps) {
  const utils = trpc.useUtils();

  const { data: wishlist, isFetching: fetching01 } =
    trpc.wishlist.getWishlist.useQuery();

  let isInWishlist = false;
  if (!!productId) {
    const { data } = trpc.wishlist.isInWishlist.useQuery(productId);
    isInWishlist = data || false;
  }

  const { mutate: toggleItem, isLoading: loading01 } =
    trpc.wishlist.toggleItem.useMutation({
      onError: ({ message }) => toast.error(message),
      onSuccess: (data) => {
        utils.wishlist.getWishlist.invalidate();
        utils.wishlist.isInWishlist.invalidate(productId);
        toast.success(data);
      },
    });

  const { mutate: clearWishlist, isLoading: loading02 } =
    trpc.wishlist.clearWishlist.useMutation();

  const isFetching = useMemo(() => fetching01, [fetching01]);
  const isLoading = useMemo(
    () => loading01 || loading02,
    [loading01, loading02],
  );

  return {
    wishlist,
    isInWishlist,
    isFetching,
    isLoading,
    toggleItem,
    clearWishlist,
  };
}
