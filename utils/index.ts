import crypto from "crypto";
import { db } from "~/lib/db";
import { CartItemWithProduct } from "~/types";

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateOTP() {
  let otp = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 6; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

export async function generateSku() {
  let newSKU = Math.floor(100000000 + Math.random() * 900000000 - 1);
  let skuExists = await db.product.findUnique({
    where: { sku: newSKU.toString() },
  });
  while (!!skuExists) {
    newSKU = Math.floor(100000000 + Math.random() * 900000000 - 1);
    skuExists = await db.product.findUnique({
      where: { sku: newSKU.toString() },
    });
  }
  return newSKU.toString();
}

export async function generateFileName() {
  const newName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
  return newName().toString();
}

export function generatePriceTag(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
}

export function getCartTotal(cartItems: CartItemWithProduct[]) {
  return generatePriceTag(
    cartItems.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  );
}
