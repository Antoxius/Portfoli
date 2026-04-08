import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();

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

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL,
    replyTo: process.env.CONTACT_REPLY_TO_EMAIL,
  };
}

function canSendWithResend(config) {
  return Boolean(config.apiKey && config.to && config.from);
}

function getAllowedOrigins(request) {
  const requestOrigin = request.nextUrl.origin;
  const configuredOrigins = (process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([requestOrigin, ...configuredOrigins]);
}

function getRequestOrigin(request) {
  const originHeader = request.headers.get("origin");

  if (originHeader) {
    return originHeader;
  }

  const refererHeader = request.headers.get("referer");

  if (!refererHeader) {
    return null;
  }

  try {
    return new URL(refererHeader).origin;
  } catch {
    return null;
  }
}

function isAllowedOrigin(request) {
  const requestOrigin = getRequestOrigin(request);

  if (!requestOrigin) {
    return false;
  }

  return getAllowedOrigins(request).has(requestOrigin);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(request) {
  const now = Date.now();
  const clientIp = getClientIp(request);
  const existingEntry = rateLimitStore.get(clientIp);

  if (!existingEntry || existingEntry.resetAt <= now) {
    const nextEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };

    rateLimitStore.set(clientIp, nextEntry);

    return {
      limited: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - nextEntry.count,
      resetAt: nextEntry.resetAt,
    };
  }

  if (existingEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      remaining: 0,
      resetAt: existingEntry.resetAt,
    };
  }

  existingEntry.count += 1;
  rateLimitStore.set(clientIp, existingEntry);

  return {
    limited: false,
    remaining: RATE_LIMIT_MAX_REQUESTS - existingEntry.count,
    resetAt: existingEntry.resetAt,
  };
}

async function sendContactEmail(payload) {
  const config = getEmailConfig();

  if (!canSendWithResend(config)) {
    return false;
  }

  const resend = new Resend(config.apiKey);
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubject = escapeHtml(payload.subject);
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  const response = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: config.replyTo || payload.email,
    subject: `Ny kontaktformular: ${payload.subject}`,
    text: [
      `Navn: ${payload.name}`,
      `Email: ${payload.email}`,
      `Emne: ${payload.subject}`,
      "",
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2>Ny besked fra portefoljen</h2>
        <p><strong>Navn:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Emne:</strong> ${safeSubject}</p>
        <p><strong>Besked:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `,
  });

  if (response.error || !response.data?.id) {
    throw new Error(response.error?.message || "Unknown email delivery error");
  }

  return true;
}

export async function POST(request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      {
        success: false,
        message: "Ugyldig origin for kontaktformularen.",
      },
      { status: 403 }
    );
  }

  const rateLimit = checkRateLimit(request);

  if (rateLimit.limited) {
    return NextResponse.json(
      {
        success: false,
        message: "For mange forespørgsler. Prøv igen om lidt.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
          ),
        },
      }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Ugyldig JSON i anmodningen." },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    });
    return NextResponse.json(
      { success: false, errors: fieldErrors },
      { status: 422 }
    );
  }

  const payload = {
    ...result.data,
    honeypot: typeof body?.honeypot === "string" ? body.honeypot : "",
  };

  if (payload.honeypot) {
    return NextResponse.json(
      {
        success: true,
        message: "Besked modtaget. Tak for din henvendelse!",
      },
      { status: 200 }
    );
  }

  const emailConfig = getEmailConfig();

  if (!canSendWithResend(emailConfig)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Kontaktformularen er ikke konfigureret til email endnu. Tilføj RESEND_API_KEY, CONTACT_TO_EMAIL og CONTACT_FROM_EMAIL i miljøvariabler.",
      },
      { status: 500 }
    );
  }

  try {
    const sentWithResend = await sendContactEmail(payload);

    if (sentWithResend) {
      return NextResponse.json(
        {
          success: true,
          message: "Besked modtaget. Tak for din henvendelse!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Failed to send contact email", error);

    return NextResponse.json(
      {
        success: false,
        message: "Email-afsendelse fejlede. Kontroller dine mail-indstillinger.",
      },
      { status: 502 }
    );
  }
}
