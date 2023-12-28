"use server";

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const s3Client = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export async function getS3ObjectURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  const signedURL = await getSignedUrl(s3Client, command, {
    expiresIn: 60,
  });
  return signedURL;
}

type getS3UploadURLParams = {
  key: string;
  fileType: string;
  fileSize: number;
  checksum: string;
};
export async function getS3UploadURL({
  key,
  fileType,
  fileSize,
  checksum,
}: getS3UploadURLParams) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });
  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  return signedURL;
}

export async function deleteS3Object(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  await s3Client.send(command);
}
