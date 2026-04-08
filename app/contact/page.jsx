"use client";

import { useState } from "react";
import { z } from "zod";
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Navn skal være mindst 2 tegn")
    .max(80, "Navn er for langt"),
  email: z.string().email("Indtast venligst en gyldig e-mailadresse"),
  subject: z
    .string()
    .min(4, "Emne skal være mindst 4 tegn")
    .max(120, "Emne er for langt"),
  message: z
    .string()
    .min(20, "Besked skal være mindst 20 tegn")
    .max(2000, "Besked er for lang (maks. 2000 tegn)"),
});

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0];
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Din besked er sendt.");
        setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatusMessage(data.message || "Noget gik galt. Prøv venligst igen.");
        setStatus("error");
      }
    } catch {
      setStatusMessage("Kunne ikke oprette forbindelse til serveren.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-4">
        <FiMail className="text-[var(--accent)]" size={24} />
        <h1 className="text-3xl font-bold">Kontakt mig</h1>
      </div>
      <p className="text-slate-400 mb-10">
        Har du et projekt i tankerne eller vil du bare sige hej? Udfyld
        formularen, så vender jeg tilbage hurtigst muligt.
      </p>

      {status === "success" && (
        <div className="flex items-center gap-3 p-4 mb-8 rounded-lg bg-green-900/30 border border-green-700 text-green-400">
          <FiCheckCircle size={20} />
          <span>
            {statusMessage || "Din besked er sendt! Jeg vender tilbage snarest."}
          </span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 mb-8 rounded-lg bg-red-900/30 border border-red-700 text-red-400">
          <FiAlertCircle size={20} />
          <span>{statusMessage || "Noget gik galt. Prøv venligst igen."}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Navn
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Peter Jensen"
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
            E-mail
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
            Emne
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="Projektforespørgsel"
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
          <label className="sr-only" htmlFor="honeypot">
            Lad dette felt være tomt
          </label>
          <input
            id="honeypot"
            name="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.honeypot}
            onChange={handleChange}
            className="hidden"
          />

          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-300 mb-1.5"
          >
            Besked
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            placeholder="Fortæl mig om dit projekt..."
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
              Sender…
            </>
          ) : (
            <>
              <FiSend size={16} />
              Send besked
            </>
          )}
        </button>
      </form>
    </div>
  );
}
