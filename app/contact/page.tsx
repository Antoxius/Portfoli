"use client";

import { useState } from "react";
import { z } from "zod";
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(4, "Subject must be at least 4 characters")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
});

type ContactForm = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactForm, string>>;
type Status = "idle" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the field error on change
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate async submission (replace with real API call)
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <FiMail className="text-[var(--accent)]" size={24} />
        <h1 className="text-3xl font-bold">Contact Me</h1>
      </div>
      <p className="text-slate-400 mb-10">
        Have a project in mind or just want to say hi? Fill in the form and
        I&apos;ll get back to you as soon as possible.
      </p>

      {status === "success" && (
        <div className="flex items-center gap-3 p-4 mb-8 rounded-lg bg-green-900/30 border border-green-700 text-green-400">
          <FiCheckCircle size={20} />
          <span>
            Your message has been sent! I&apos;ll be in touch soon.
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 mb-8 rounded-lg bg-red-900/30 border border-red-700 text-red-400">
          <FiAlertCircle size={20} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--card-bg)] border text-[var(--foreground)] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
              errors.name ? "border-red-500" : "border-[var(--border)]"
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--card-bg)] border text-[var(--foreground)] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
              errors.email ? "border-red-500" : "border-[var(--border)]"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="Project inquiry"
            className={`w-full px-4 py-3 rounded-lg bg-[var(--card-bg)] border text-[var(--foreground)] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition ${
              errors.subject ? "border-red-500" : "border-[var(--border)]"
            }`}
          />
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className={`w-full px-4 py-3 rounded-lg bg-[var(--card-bg)] border text-[var(--foreground)] placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition resize-none ${
              errors.message ? "border-red-500" : "border-[var(--border)]"
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              Sending…
            </>
          ) : (
            <>
              <FiSend size={16} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
