import * as Minio from 'minio';

const globalForMinio = globalThis as unknown as {
  minioClient: Minio.Client | undefined;
};

export const minioClient =
  globalForMinio.minioClient ??
  new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000', 10),
    useSSL: process.env.MINIO_USE_SSL === 'true', // false for local IP usually
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
    // Important for Docker: Force the URL style to be path-based
    // (e.g., http://192.168.x.x:9000/bucket-name/file)
    // instead of AWS style (http://bucket-name.192.168.x.x:9000)
    // which requires DNS subdomains.
    pathStyle: true, 
  });

if (process.env.NODE_ENV !== 'production') {
  globalForMinio.minioClient = minioClient;
}

// Helper: Ensure bucket exists (run this once or on app startup)
export async function ensureBucketExists(bucketName: string) {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, 'us-east-1'); // Region doesn't matter much for Minio
    console.log(`🪣 Bucket '${bucketName}' created.`);
    
    // Optional: Set policy to allow public reads if you want (be careful!)
    // For Jarvis, we probably want private reads and presigned URLs for viewing too.
  }
}