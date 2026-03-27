import { minioClient } from './minio';

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'atlas-uploads';

/**
 * Generates a temporary URL for the BROWSER to upload a file directly.
 * @param filename The name of the file (e.g., "my-image.png")
 * @param mimeType The content type (e.g., "image/png")
 */
export async function getPresignedUploadUrl(
  objectName: string, 
  mimeType: string
) {
  // Expiry: 15 minutes (enough time to start the upload)
  const expiry = 15 * 60; 

  return await minioClient.presignedPutObject(
    BUCKET_NAME,
    objectName,
    expiry
  );
}

/**
 * Generates a temporary URL for the BROWSER to view/download a file.
 * This keeps your bucket private!
 */
export async function getPresignedDownloadUrl(objectName: string) {
  // Expiry: 1 hour (or however long you want the link to work)
  const expiry = 60 * 60; 

  return await minioClient.presignedGetObject(
    BUCKET_NAME,
    objectName,
    expiry
  );
}

/**
 * Deletes an object from Minio
 */
export async function deleteObject(objectName: string) {
  await minioClient.removeObject(BUCKET_NAME, objectName);
}