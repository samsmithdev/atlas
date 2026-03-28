"use server";

import { checkAuth } from "@/features/auth/queries";
import prisma from "@/lib/db";
import { ensureBucketExists } from "@/lib/minio";
import { getPresignedUploadUrl } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid"; // npm install uuid @types/uuid

export async function createAsset(data: {
  name: string;
  objectName: string; // The Minio path (userId/date/uuid.ext)
  mimeType: string;
  size: number;
  bucket: string;
  fileId?: string; // Optional: Link directly to a project
  folderId?: string; // Optional: Link directly to a folder
}) {
  const { userId, session } = await checkAuth();

  ensureBucketExists("atlas-uploads");
  // Create the Asset record
  const asset = await prisma.asset.create({
    data: {
      name: data.name,
      key: data.objectName,
      bucket: data.bucket,
      mimeType: data.mimeType,
      size: data.size,
      userId: userId,
      fileId: data.fileId,
    },
  });

  return asset;
}

export type UploadConfig = {
  url: string;
  objectName: string;
  originalName: string;
  mimeType: string;
};

export async function generateUploadUrl(
  filename: string,
  mimeType: string
): Promise<{ success: boolean; data?: UploadConfig; error?: string }> {
  // 1. Auth Check (Protect your bucket!)
  const { userId, session } = await checkAuth();

  try {
    // 2. Generate a safe, unique filename (Object Key)
    // Structure: userId/year/month/uuid-originalName
    // This keeps folders organized in Minio if you browse manually.
    const date = new Date();
    const uniqueId = uuidv4();
    const extension = filename.split(".").pop();
    const safeFilename = `${userId}/${date.getFullYear()}/${uniqueId}.${extension}`;

    // 3. Get the URL from Minio
    const url = await getPresignedUploadUrl(safeFilename, mimeType);

    return {
      success: true,
      data: {
        url, // The magic link for the browser
        objectName: safeFilename, // We need to save this to the DB later
        originalName: filename,
        mimeType,
      },
    };
  } catch (error) {
    console.error("Minio Error:", error);
    return { success: false, error: "Failed to generate upload URL" };
  }
}
