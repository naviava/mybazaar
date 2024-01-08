import { trpc } from "~/app/_trpc/client";
import { Separator } from "~/components/ui/separator";

interface IProps {
  productId: string;
}

export function CartHoverCardItem({ productId }: IProps) {
  const { data: cartItem } = trpc.cart.getCartItem.useQuery(productId);

  return (
    <div className="px-2">
      CartHoverCardItem
      <Separator className="my-2" />
    </div>
  );
}
