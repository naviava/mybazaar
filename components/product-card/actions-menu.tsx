interface IProps {
  productId: string;
  isHover?: boolean;
  isStatic?: boolean;
}

export function ActionsMenu({ productId, isHover, isStatic }: IProps) {
  return (
    <div className="absolute right-2 top-2 h-20 w-6 hover:bg-black">
      ActionsMenu
    </div>
  );
}
