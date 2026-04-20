"use client";

import emailjs from "@emailjs/browser";
import { useState, type ChangeEvent, type SubmitEventHandler } from "react";
import {
  MdAccessTime,
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdSend,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        toast.error("Falta configurar el servicio de correo.");
        return;
      }

      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "No proporcionado",
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("¡Mensaje enviado con éxito! Te contactaremos pronto.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast.error("Hubo un error al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12 bg-blue-600 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-6">
              Información de Contacto
            </h3>
            <p className="mb-8 text-blue-100 leading-relaxed">
              Estamos listos para ayudarte con los mejores servicios de limpieza
              y mantención. Escríbenos o llámanos y te responderemos a la
              brevedad.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MdPhone className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h4 className="font-medium">Teléfono</h4>
                  <p className="text-blue-100">+56 9 93319653</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdEmail className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h4 className="font-medium">Correo Electrónico</h4>
                  <p className="text-blue-100">infoclean@superclean.cl</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdLocationOn className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h4 className="font-medium">Ubicación</h4>
                  <p className="text-blue-100">Viña del Mar, Chile.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MdAccessTime className="w-6 h-6 text-blue-200 mt-1" />
                <div>
                  <h4 className="font-medium">Horario de Atención</h4>
                  <p className="text-blue-100">
                    Lunes a Viernes: 08:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Envíanos un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="+56 9..."
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ¿En qué te podemos ayudar?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Detalla aquí los servicios de limpieza que necesitas..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <span>{isSubmitting ? "Enviando..." : "Enviar Mensaje"}</span>
                {!isSubmitting && <MdSend className="w-5 h-5" />}
              </button>

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
