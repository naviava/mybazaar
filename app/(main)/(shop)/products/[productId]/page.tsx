"use client";

import { useRecoilState } from "recoil";
import { textState } from "~/store/recoil";

interface IProps {
  params: {
    productId: string;
  };
}

export default function ProductIdPage({ params }: IProps) {
  const [text, setText] = useRecoilState(textState);

  return (
    <div className="pb-24">
      <p>Product Name:</p>
    </div>
  );
}
