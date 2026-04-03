import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(request) {
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

  // Here you would send an email or save to a database.
  // For now we return a successful acknowledgement.
  return NextResponse.json(
    { success: true, message: "Besked modtaget. Tak for din henvendelse!" },
    { status: 200 }
  );
}
