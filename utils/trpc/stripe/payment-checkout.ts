import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db } from "~/lib/db";
import { stripe } from "~/lib/stripe";
import { privateProcedure } from "~/server/trpc";

export const paymentCheckout = privateProcedure
  .input(
    z.object({
      cartId: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { user } = ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to checkout.",
      });
    }

    const { cartId } = input;
    const cart = await db.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: { userId: user.id },
      select: { stripeCustomerId: true },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      currency: "INR",
      mode: "payment",
      billing_address_collection: "auto",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 2,
          price_data: {
            currency: "INR",
            product_data: {
              name: "TRPC Payment",
              description: "TRPC for life!",
            },
            unit_amount: 200000,
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/stripe?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/stripe?canceled=true`,
      metadata: { userId: user.id },
    });

    return { url: checkoutSession.url };
  });
