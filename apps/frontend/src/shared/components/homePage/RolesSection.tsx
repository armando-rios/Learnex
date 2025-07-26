import { Link } from 'react-router-dom';

const RolesSection = () => {
  // Beneficios estudiante
  const studentBenefits = [
    'Acceso a mentores verificados',
    'Mentorías personalizadas 1:1',
    'Proyectos reales para tu portafolio',
    'Desafíos para practicar skills',
    'Networking con profesionales',
  ];

  // Beneficios mentor
  const mentorBenefits = [
    'Construye tu marca personal',
    'Flexibilidad total de horarios',
    'Amplía tu red profesional',
    'Crea contenido y desafíos',
    'Desarrolla habilidades de liderazgo',
  ];

  return (
    <section id="roles" className="bg-theme-bg-secondary py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">
            ¿Cómo quieres participar?
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Elige el rol que mejor se adapte a tus objetivos y comienza tu
            journey de aprendizaje colaborativo
          </p>
        </div>

        {/* Role cards grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Student Card */}
          <div className="group relative bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            {/* Card header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-4xl text-white shadow-lg">
                🎓
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">
                Estudiante
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Acelera tu crecimiento profesional aprendiendo directamente de
                expertos en la industria
              </p>
            </div>

            {/* Benefits list */}
            <div className="mb-8">
              <ul className="space-y-4 border border-dashed border-blue-300 rounded-lg p-6 bg-blue-50/50">
                {studentBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <Link to="/registrarse" className="block">
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Comenzar a Aprender
              </button>
            </Link>
          </div>

          {/* Mentor Card */}
          <div className="group relative bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 to-amber-500"></div>

            {/* Card header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-amber-500 flex items-center justify-center text-4xl text-white shadow-lg">
                👨‍🏫
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Mentor</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Comparte tu experiencia, construye tu marca personal y genera
                impacto en la próxima generación
              </p>
            </div>

            {/* Benefits list */}
            <div className="mb-8">
              <ul className="space-y-4 border border-dashed border-green-300 rounded-lg p-6 bg-green-50/50">
                {mentorBenefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <Link to="/registrarse" className="block">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Convertirme en Mentor
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
