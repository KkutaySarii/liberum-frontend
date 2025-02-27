import { NextRequest, NextResponse } from "next/server";
import { CID } from "multiformats/cid";
import * as raw from "multiformats/codecs/raw";
import { sha256 } from "multiformats/hashes/sha2";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createErrorResponse } from "@/utils/api";

const bytesToCID = async (bytes: ArrayBuffer) => {
  const hash = await sha256.digest(raw.encode(new Uint8Array(bytes)));
  const cid = CID.create(1, raw.code, hash);
  return cid.toString();
};

export const POST = async (req: NextRequest) => {
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const formData = await req.formData();
    const key: string = formData.get("key") as string;
    const file: File | null = formData.get("file") as unknown as File;

    if (!key || !file) throw new Error("Form data not valid.");

    const bytes = await file.arrayBuffer();
    const CID = await bytesToCID(bytes);

    const upload = new Upload({
      client: s3,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${key}/${CID}`,
        Body: file,
        ContentType: file.type,
      },
    });

    return NextResponse.json(await upload.done());
  } catch (err: unknown) {
    const error: Error = err as Error;
    return createErrorResponse(error.message, 500);
  }
};
