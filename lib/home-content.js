export const homeContent = [
  {
    id: 1,
    title: "Frontend med fokus på drift",
    type: "tekst",
    body:
      "Jeg bygger webløsninger og produktflader med fokus på driftssikkerhed, klare datastrømme og et setup der er let at udrulle og vedligeholde.",
  },
  {
    id: 2,
    title: "Formularvalidering med Zod",
    type: "kode",
    language: "React + Zod",
    body:
      "const contactSchema = z.object({\n  name: z.string().min(2).max(80),\n  email: z.string().email(),\n  subject: z.string().min(4).max(120),\n  message: z.string().min(20).max(2000),\n});\n\nconst result = contactSchema.safeParse(form);\nif (!result.success) {\n  setErrors(result.error.flatten().fieldErrors);\n  return;\n}",
  },
];