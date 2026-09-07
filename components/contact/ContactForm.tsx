"use client";
// components/contact/ContactForm.tsx
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact form:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-[#F2EBDC] bg-[#FAF8F3] h-full min-h-[440px]">
        <div className="w-16 h-16 bg-[#1BA14B]/10 border border-[#1BA14B]/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#1BA14B]" />
        </div>
        <h3
          className="text-2xl font-bold text-[#0B131F] mb-3"
          style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
        >
          Message Received!
        </h3>
        <p className="text-[#64748B] text-sm leading-relaxed max-w-xs mb-8">
          Thank you for contacting B.H.T. Collections. Our team will respond within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-[#1C75BC] border-b-2 border-[#1C75BC] hover:opacity-80 transition-opacity"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Row 1 */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-name"
            className="text-[11px] font-bold text-[#0B131F] tracking-[0.1em] uppercase"
          >
            Full Name <span className="text-[#D92626]">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            {...register("name")}
            className="border border-[#CBD5E1] px-4 py-3 text-sm text-[#0B131F] placeholder-[#94A3B8] focus:outline-none focus:border-[#1C75BC] focus:ring-1 focus:ring-[#1C75BC] bg-white transition-colors rounded"
          />
          {errors.name && (
            <p className="text-[11px] text-[#D92626] font-semibold">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-email"
            className="text-[11px] font-bold text-[#0B131F] tracking-[0.1em] uppercase"
          >
            Email Address <span className="text-[#D92626]">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            {...register("email")}
            className="border border-[#CBD5E1] px-4 py-3 text-sm text-[#0B131F] placeholder-[#94A3B8] focus:outline-none focus:border-[#1C75BC] focus:ring-1 focus:ring-[#1C75BC] bg-white transition-colors rounded"
          />
          {errors.email && (
            <p className="text-[11px] text-[#D92626] font-semibold">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-phone"
            className="text-[11px] font-bold text-[#0B131F] tracking-[0.1em] uppercase"
          >
            Phone <span className="text-[#94A3B8] font-normal normal-case">(Optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            placeholder="+971 50 000 0000"
            autoComplete="tel"
            {...register("phone")}
            className="border border-[#CBD5E1] px-4 py-3 text-sm text-[#0B131F] placeholder-[#94A3B8] focus:outline-none focus:border-[#1C75BC] focus:ring-1 focus:ring-[#1C75BC] bg-white transition-colors rounded"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-subject"
            className="text-[11px] font-bold text-[#0B131F] tracking-[0.1em] uppercase"
          >
            Subject <span className="text-[#D92626]">*</span>
          </label>
          <select
            id="cf-subject"
            {...register("subject")}
            className="border border-[#CBD5E1] px-4 py-3 text-sm text-[#0B131F] focus:outline-none focus:border-[#1C75BC] focus:ring-1 focus:ring-[#1C75BC] bg-white transition-colors appearance-none rounded"
          >
            <option value="">Select a subject…</option>
            <option value="Product Enquiry">Product Enquiry</option>
            <option value="Bulk Order">Bulk / Wholesale Order</option>
            <option value="Delivery">Delivery Information</option>
            <option value="Returns">Returns &amp; Refunds</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && (
            <p className="text-[11px] text-[#D92626] font-semibold">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-message"
          className="text-[11px] font-bold text-[#0B131F] tracking-[0.1em] uppercase"
        >
          Message <span className="text-[#D92626]">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={6}
          placeholder="Tell us how we can help you…"
          {...register("message")}
          className="border border-[#CBD5E1] px-4 py-3 text-sm text-[#0B131F] placeholder-[#94A3B8] focus:outline-none focus:border-[#1C75BC] focus:ring-1 focus:ring-[#1C75BC] bg-white transition-colors resize-none rounded"
        />
        {errors.message && (
          <p className="text-[11px] text-[#D92626] font-semibold">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

