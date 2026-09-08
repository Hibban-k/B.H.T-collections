import fs from "fs";
import path from "path";

export class UploadService {
  static async uploadImage(file: File): Promise<{ url: string; fileName: string }> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const originalName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const ext = path.extname(originalName) || ".jpg";
    const baseName = path.basename(originalName, ext);
    const uniqueFileName = `${baseName}_${Date.now()}${ext}`;

    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    return {
      url: `/uploads/${uniqueFileName}`,
      fileName: uniqueFileName,
    };
  }
}
