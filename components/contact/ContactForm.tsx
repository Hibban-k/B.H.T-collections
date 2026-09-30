"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please enter a subject"),
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

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="demo-note">This is an interactive design demo. Your information is not sent or stored.</p>
      
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input 
            id="name" 
            autoComplete="name" 
            placeholder="Full name" 
            {...register("name")} 
          />
          {errors.name && <p style={{color: "var(--red)", fontSize: "12px", marginTop: "4px"}}>{errors.name.message}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input 
            id="email" 
            type="email" 
            autoComplete="email" 
            placeholder="you@company.com" 
            {...register("email")} 
          />
          {errors.email && <p style={{color: "var(--red)", fontSize: "12px", marginTop: "4px"}}>{errors.email.message}</p>}
        </div>
      </div>
      
      <div className="form-field">
        <label htmlFor="subject">What would you like to discuss?</label>
        <input 
          id="subject" 
          placeholder="General enquiry"
          {...register("subject")} 
        />
        {errors.subject && <p style={{color: "var(--red)", fontSize: "12px", marginTop: "4px"}}>{errors.subject.message}</p>}
      </div>
      
      <div className="form-field">
        <label htmlFor="message">Your requirements</label>
        <textarea 
          id="message" 
          placeholder="Tell us about your collection, quantities, or destination."
          {...register("message")}
        />
        {errors.message && <p style={{color: "var(--red)", fontSize: "12px", marginTop: "4px"}}>{errors.message.message}</p>}
      </div>
      
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Preview enquiry"}
        {!isSubmitting && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>}
      </button>
      
      {submitted && (
        <p id="form-feedback" className="form-feedback" role="status" style={{ display: "block" }}>
          Your demo enquiry is ready. Nothing has been sent or saved. For a real enquiry, use the phone or email contact on this page.
        </p>
      )}
    </form>
  );
}
