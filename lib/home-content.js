export const homeContent = [
  {
    id: 1,
    title: "Frontend med fokus på drift",
    type: "tekst",
    body:
      "Jeg bygger portefølje- og produktflader med fokus på driftssikkerhed, klare datastrømme og et setup der er let at udrulle og vedligeholde.",
  },
  {
    id: 2,
    title: "Kontaktflow på serveren",
    type: "kode",
    language: "Next.js",
    body:
      "export async function POST(request) {\n  const payload = await request.json();\n  await resend.emails.send({\n    from: process.env.CONTACT_FROM_EMAIL,\n    to: process.env.CONTACT_TO_EMAIL,\n    replyTo: payload.email,\n    subject: `Ny kontaktformular: ${payload.subject}`,\n  });\n}",
  },
];