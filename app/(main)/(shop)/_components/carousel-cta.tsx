"use client";

import { memo } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";

interface IProps {
  productId: string;
  productName: string;
}

export const CarouselCTA = memo(_CarouselCTA);
function _CarouselCTA({ productId, productName }: IProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{
        opacity: 100,
        x: 0,
        transition: {
          duration: 0.7,
          delayChildren: 0.3,
          staggerChildren: 1,
        },
      }}
      className="z-[2] space-y-6"
    >
      <h2 className="text-center text-5xl font-bold uppercase text-white lg:text-6xl">
        {productName}
      </h2>
      <div className="mx-auto w-fit">
        <Button
          asChild
          variant="amazon"
          className="rounded-sm text-base font-semibold"
        >
          <Link href={`/products/${productId}`} className="">
            Shop Now
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
