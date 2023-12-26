"use client";

import { useCallback } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useIsMounted } from "~/hooks/use-is-mounted";

import { Form } from "~/components/ui/form";
import { BannerAndActionButtons } from "~/components/banner-and-action-buttons";
import { PricingAvailabilityCard } from "./price-availability-card";
import { ProductInfoCard } from "./product-info-card";

import { productFormSchema } from "~/utils/form-inputs/products/product-form-schema";

export function NewProductForm() {
  const inMounted = useIsMounted();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      categorySlug: "",
      description: "",
      discountPct: 0,
      stockCount: 0,
      isAvailable: false,
      images: [],
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof productFormSchema>) => {
    console.log(values);
  }, []);

  if (!inMounted) return null;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <BannerAndActionButtons
          actionLabel="Create Product"
          secondaryActionLabel="Cancel"
          secondaryActionHref="/admin/products"
        >
          TODO: Banner goes here.
        </BannerAndActionButtons>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 space-y-6 lg:col-span-2">
            <ProductInfoCard form={form} />
            {/* TODO: Add image upload widget. */}
            <div>Image Upload Widget</div>
          </div>
          <div className="col-span-3 lg:col-span-1">
            <PricingAvailabilityCard form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
}
