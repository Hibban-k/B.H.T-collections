import { NextRequest, NextResponse } from "next/server";
import { UploadService } from "@/lib/services/upload.service";
import { withAuth } from "@/lib/api/helpers";

export const POST = withAuth("upload:write", async (req: Request) => {
  // We need to typecast to NextRequest inside since withAuth uses generic Request
  const nextReq = req as NextRequest;
  const formData = await nextReq.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("No file uploaded");
  }

  const result = await UploadService.uploadImage(file);
  return NextResponse.json({ success: true, ...result });
});
