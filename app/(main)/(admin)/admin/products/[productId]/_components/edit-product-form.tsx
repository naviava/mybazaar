"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useIsMounted } from "~/hooks/use-is-mounted";
import { useNotificationBanner } from "~/store/use-notification-banner";

import { Form } from "~/components/ui/form";
import { NotificationBanner } from "~/components/notification-banner";
import { BannerAndActionButtons } from "~/components/banner-and-action-buttons";
import { PricingAvailabilityCard } from "../../_components/price-availability-card";
import { ProductInfoCard } from "../../_components/product-info-card";
import { ProductMediaCard } from "./product-media-card";

import { trpc } from "~/app/_trpc/client";
import { serverClient } from "~/app/_trpc/server-client";
import { productFormSchema } from "~/utils/form-inputs/products/product-form-schema";

interface IProps {
  productId: string;
  initialData: Awaited<ReturnType<typeof serverClient.product.getProductById>>;
}

export function EditProductForm({ productId, initialData }: IProps) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const utils = trpc.useUtils();
  const { showBanner, hideBanner } = useNotificationBanner((state) => state);

  const { data: product } = trpc.product.getProductById.useQuery(
    productId,
    initialData && {
      initialData: {
        ...initialData,
        createdAt: initialData.createdAt.toISOString(),
        updatedAt: initialData.updatedAt.toISOString(),
        category: {
          ...initialData.category,
          createdAt: initialData.category.createdAt.toISOString(),
          updatedAt: initialData.category.updatedAt.toISOString(),
        },
        images: initialData.images.map((image) => ({
          ...image,
          createdAt: image.createdAt.toISOString(),
          updatedAt: image.updatedAt.toISOString(),
        })),
      },
    },
  );

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      categorySlug: product?.categorySlug || "",
      description: product?.description || "",
      discountPct: product?.discountPct || 0,
      stockCount: product?.stockCount || 0,
      isAvailable: product?.isAvailable || false,
    },
  });

  const { mutate: handleUpdateProduct, isLoading } =
    trpc.product.updateProduct.useMutation({
      onMutate: () => hideBanner(),
      onError: ({ message }) =>
        showBanner({
          type: "error",
          message,
        }),
      onSuccess: () => {
        utils.product.getProductById.invalidate(productId);
        router.refresh();
        showBanner({
          type: "success",
          message: "Product updated successfully",
        });
      },
    });

  const onSubmit = useCallback(
    async (values: z.infer<typeof productFormSchema>) => {
      handleUpdateProduct({ ...values, id: productId });
    },
    [handleUpdateProduct, productId],
  );

  if (!isMounted || !product) return null;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <BannerAndActionButtons
          actionLabel="Update Product"
          secondaryActionLabel="Cancel"
          secondaryActionHref="/admin/products"
          disabled={isLoading}
        >
          <NotificationBanner />
        </BannerAndActionButtons>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 space-y-6 lg:col-span-2">
            <ProductInfoCard form={form} disabled={isLoading} />
            <ProductMediaCard productId={productId} />
          </div>
          <div className="col-span-3 lg:col-span-1">
            <PricingAvailabilityCard form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
}
