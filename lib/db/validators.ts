/**
 * Shared database validators to ensure performance, data integrity,
 * and compliance with MongoDB Atlas storage policies.
 */

/**
 * Prohibits raw base64 binary strings from being saved to MongoDB.
 * Ensures documents remain small (under 5 KB) and that all image assets
 * are uploaded to Cloudinary or hosted on external CDNs.
 */
export const noBase64Validator = {
  validator: function (val: string | null | undefined): boolean {
    if (!val || typeof val !== "string") return true;
    const trimmed = val.trim();
    // Prohibit data URI schemes and explicit base64 strings
    if (trimmed.startsWith("data:") || trimmed.includes(";base64,")) {
      return false;
    }
    // Prohibit oversized non-URL strings
    if (
      trimmed.length > 2048 &&
      !trimmed.startsWith("http://") &&
      !trimmed.startsWith("https://") &&
      !trimmed.startsWith("/")
    ) {
      return false;
    }
    return true;
  },
  message:
    "Binary storage (base64) is prohibited in MongoDB. Upload the image to Cloudinary first and store only the HTTPS URL.",
};

export const noBase64ArrayValidator = {
  validator: function (arr: string[] | null | undefined): boolean {
    if (!arr || !Array.isArray(arr)) return true;
    return arr.every((item) => noBase64Validator.validator(item));
  },
  message:
    "Binary storage (base64) is prohibited in MongoDB image lists. Upload all assets to Cloudinary and store only HTTPS URLs.",
};
