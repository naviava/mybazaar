import { db } from "~/lib/db";

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
