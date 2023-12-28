import crypto from "crypto";

export async function generateFileName() {
  const newName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
  return newName().toString();
}
