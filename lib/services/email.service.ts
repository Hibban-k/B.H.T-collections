export interface InquiryEmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  productName?: string;
}

export interface OrderEmailPayload {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  totalAmount: number;
  items: Array<{ name: string; quantity: number; price: number }>;
}

export class EmailService {
  private static adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "admin@blankethouse.ae";

  /**
   * Send notification for a new customer inquiry.
   * If external email API (e.g., RESEND_API_KEY) is configured, dispatches real email.
   * Gracefully falls back to logged notification if keys are not yet provided.
   */
  static async sendInquiryNotification(payload: InquiryEmailPayload): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;

    const emailSubject = `[BHT Inquiries] New message from ${payload.name}: ${payload.subject || "Customer Inquiry"}`;
    const emailBody = `
New Customer Inquiry Received:
------------------------------
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone || "Not provided"}
Product: ${payload.productName || "General Site Inquiry"}
Subject: ${payload.subject || "No subject"}

Message:
${payload.message}
------------------------------
Blanket House Trading L.L.C. Website Inquiry System
    `.trim();

    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "BHT Notifications <notifications@blankethouse.ae>",
            to: [this.adminEmail],
            reply_to: payload.email,
            subject: emailSubject,
            text: emailBody,
          }),
        });

        if (response.ok) {
          console.log(`[EmailService] Inquiry notification email sent to ${this.adminEmail}`);
          return true;
        } else {
          console.warn(
            `[EmailService] Resend API responded with status ${response.status}:`,
            await response.text().catch(() => "")
          );
        }
      } catch (err) {
        console.error("[EmailService] Failed to dispatch email via Resend:", err);
      }
    } else {
      // In development or when RESEND_API_KEY is not yet set:
      console.log(`[EmailService] Inquiry recorded. (Set RESEND_API_KEY to send live emails to ${this.adminEmail})`);
      console.log(emailBody);
    }

    return false;
  }

  /**
   * Send notification for a new order created.
   */
  static async sendOrderNotification(payload: OrderEmailPayload): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;

    const emailSubject = `[BHT Orders] New Order #${payload.orderNumber} placed by ${payload.customerName}`;
    const itemsList = payload.items
      .map((item) => `- ${item.name} x${item.quantity} (AED ${item.price})`)
      .join("\n");

    const emailBody = `
New Order Created:
-----------------
Order Number: ${payload.orderNumber}
Customer: ${payload.customerName}
Email: ${payload.email}
Phone: ${payload.phone}
Total: AED ${payload.totalAmount}

Items:
${itemsList}
-----------------
Blanket House Trading L.L.C. Order System
    `.trim();

    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "BHT Orders <orders@blankethouse.ae>",
            to: [this.adminEmail, payload.email],
            subject: emailSubject,
            text: emailBody,
          }),
        });

        if (response.ok) {
          return true;
        }
      } catch (err) {
        console.error("[EmailService] Failed to dispatch order notification:", err);
      }
    } else {
      console.log(`[EmailService] Order notification logged for #${payload.orderNumber}`);
      console.log(emailBody);
    }

    return false;
  }
}
