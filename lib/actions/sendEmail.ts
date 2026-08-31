"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.email("Correo electrónico inválido."),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function sendEmailAction(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = contactSchema.safeParse(data);
}
