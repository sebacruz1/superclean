import {
  MdOutlineCleanHands,
  MdOutlineCleaningServices,
  MdOutlineChair,
  MdOutlineBusinessCenter,
} from "react-icons/md";
import { GiFloorPolisher } from "react-icons/gi";

export const Services = () => {
  const services = [
    {
      name: "Sanitizado y desinfección profesional",
      icon: <MdOutlineCleanHands className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Limpieza y Recuperación de Pisos Flotantes",
      icon: <MdOutlineCleaningServices className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Limpieza de Alfombras",
      icon: <GiFloorPolisher className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Lavado de tapices de Sofás, Sitiales, Futones y Similares",
      icon: <MdOutlineChair className="w-8 h-8 text-blue-600" />,
    },
    {
      name: "Servicio de Aseo y Mantención diaria a Oficinas y Empresas",
      icon: <MdOutlineBusinessCenter className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <section id="services" className="py-24 px-4 relative bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Servicios
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <li
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full gap-4 transition-transform hover:-translate-y-1"
            >
              <div className="p-3 bg-blue-50 rounded-full">{service.icon}</div>

              <span className="text-xl font-semibold text-gray-700 leading-relaxed">
                {service.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
