import { InquiryRepository, InquiryFilter, SerializedInquiry } from "@/lib/repositories/inquiry.repository";
import { EmailService } from "@/lib/services/email.service";

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  productSlug?: string;
  productName?: string;
}

export class InquiryService {
  static async submitInquiry(input: CreateInquiryInput): Promise<SerializedInquiry> {
    if (!input.name || !input.name.trim()) {
      throw new Error("Full name is required.");
    }
    if (!input.email || !input.email.includes("@")) {
      throw new Error("A valid email address is required.");
    }
    if (!input.message || !input.message.trim()) {
      throw new Error("Message cannot be empty.");
    }

    const inquiry = await InquiryRepository.create({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || "",
      subject: input.subject?.trim() || "General Inquiry",
      message: input.message.trim(),
      productSlug: input.productSlug?.trim() || undefined,
      productName: input.productName?.trim() || undefined,
      status: "new",
      emailNotified: false,
    });

    // Fire email notification asynchronously (non-blocking)
    EmailService.sendInquiryNotification({
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      subject: inquiry.subject,
      message: inquiry.message,
      productName: inquiry.productName,
    })
      .then(async (notified) => {
        if (notified) {
          await InquiryRepository.updateStatus(inquiry._id, inquiry.status, true);
        }
      })
      .catch((err) => {
        console.error("[InquiryService] Notification error:", err);
      });

    return inquiry;
  }

  static async getInquiries(filter?: InquiryFilter): Promise<SerializedInquiry[]> {
    return InquiryRepository.findAll(filter);
  }

  static async getInquiryCount(filter?: InquiryFilter): Promise<number> {
    return InquiryRepository.count(filter);
  }

  static async getInquiryById(id: string): Promise<SerializedInquiry | null> {
    return InquiryRepository.findById(id);
  }

  static async updateInquiryStatus(id: string, status: string): Promise<SerializedInquiry | null> {
    const validStatuses = ["new", "in_progress", "resolved", "archived"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(", ")}`);
    }
    return InquiryRepository.updateStatus(id, status);
  }

  static async deleteInquiry(id: string): Promise<boolean> {
    return InquiryRepository.delete(id);
  }
}
