export const homeContent = [
  {
    id: 1,
    title: "Frontend med fokus paa drift",
    type: "text",
    body:
      "Jeg bygger portfolio- og produktflader med fokus paa driftssikkerhed, klare datastraemme og et setup der er let at deploye og vedligeholde.",
  },
  {
    id: 2,
    title: "Kontaktflow paa serveren",
    type: "code",
    language: "Next.js",
    body:
      "export async function POST(request) {\n  const payload = await request.json();\n  await resend.emails.send({\n    from: process.env.CONTACT_FROM_EMAIL,\n    to: process.env.CONTACT_TO_EMAIL,\n    replyTo: payload.email,\n    subject: `Ny kontaktformular: ${payload.subject}`,\n  });\n}",
  },
  {
    id: 3,
    title: "Hvad du kan forvente",
    type: "text",
    body:
      "Denne portfolio koerer nu uden en separat content-backend. Det giver en enklere deployment, faerre fejlflader og en bedre demooplevelse for recruiters.",
  },
];