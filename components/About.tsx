export const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Quiénes Somos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center"> <h3 className="text-xl font-semibold mb-3 text-gray-700"> Nuestra <br /> Trayectoria </h3> <p className="text-gray-600 leading-relaxed"> Somos una empresa de Servicios de Limpieza Profesional que cuenta con mas de 25 años de experiencia
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Equipamiento Profesional
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Nos caracterizamos por trabajar con los mejores implementos,
              maquinarias industriales y productos de calidad reconocida
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Nuestro Compromiso
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cumplimos con lo que ofrecemos, somos puntuales con las horas
              agendadas y entregamos los servicios en los plazos acordados
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              Equipo de Confianza
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Nuestra atención es personalizada, contamos con personal
              calificado, confiable y todos nuestros trabajos son garantizados
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
