import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Configure Cloudinary securely on the backend
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class UploadService {
  static async uploadImage(
    file: File,
    folder: string = "general"
  ): Promise<{ url: string; fileName: string }> {
    return this.uploadFile(file, folder);
  }

  static async uploadFile(
    file: File,
    folder: string = "general"
  ): Promise<{ url: string; fileName: string }> {
    // 1. Check if keys are set
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      console.warn("Cloudinary not configured! Ensure CLOUDINARY_CLOUD_NAME, API_KEY, and API_SECRET are in .env");
      throw new Error("Storage is not configured properly.");
    }

    // 2. Read the file into a Node.js Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Create a sanitized filename for the public_id
    const originalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    
    const isPdf = file.type === "application/pdf" || originalName.endsWith(".pdf");

    // 4. Clean folder hierarchy (e.g. bht-collections/products, bht-collections/brands, bht-collections/pdfs)
    const sanitizedFolder = folder.replace(/^\/+|\/+$/g, "");
    const targetFolder = `bht-collections/${sanitizedFolder}`;

    // 5. Wrap the upload_stream in a Promise so we can await it
    return new Promise((resolve, reject) => {
      const uploadOptions: Record<string, any> = {
        folder: targetFolder,
        public_id: `${originalName.split('.')[0]}_${Date.now()}`,
        resource_type: isPdf ? "raw" : "auto",
      };

      // Optimize images (auto format webp/avif, auto quality compression)
      if (!isPdf) {
        uploadOptions.transformation = [
          { quality: "auto:good", fetch_format: "auto" }
        ];
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error("Cloudinary upload failed:", error);
            return reject(new Error("Failed to upload file to cloud storage."));
          }
          if (!result) {
            return reject(new Error("Upload succeeded but returned no result."));
          }

          // Return the secure HTTPS URL provided by Cloudinary
          resolve({
            url: result.secure_url,
            fileName: result.public_id,
          });
        }
      );

      // Stream the buffer to Cloudinary
      uploadStream.end(buffer);
    });
  }
}
