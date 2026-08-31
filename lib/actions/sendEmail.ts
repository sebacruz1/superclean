"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.email("Correo electrónico inválido."),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function sendEmailAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.issues.reduce(
      (acc: Record<string, string>, issue) => {
        const field = issue.path[0] as string;
        if (field && !acc[field]) {
          acc[field] = issue.message;
        }
        return acc;
      },
      {},
    );

    return {
      success: false,
      message: "Por favor, revisa los campos del formulario.",
      error: Object.values(fieldErrors)[0] ?? "Por favor, revisa los campos del formulario.",
    };
  }
  const { name, email, phone, message } = validatedFields.data;

  if (!process.env.RESEND_API_KEY) {
    console.log("[sendEmailAction] RESEND_API_KEY no configurada, se omite el envío:", {
      name,
      email,
      phone,
      message,
    });
    return { success: true, message: "Mensaje enviado con éxito!" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "SuperClean <webpage@superclean.cl>",
      to: "infoclean@superclean.cl",
      subject: `Nuevo contacto web: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
    });
    if (error) {
      return { success: false, error: "Error del servidor de correo" };
    }
    return { success: true, message: "Mensaje enviado con éxito!" };
  } catch (error) {
    return { success: false, error: "Ocurrió un error inesperado" };
  }
}
