import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import InputField from '../../../features/auth/components/InputField';
import TextareaField from '../../../features/auth/components/TextareaField';

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted:', data);
    // Aquí irá la lógica de envío

    // Reset form after submission
    reset();
  });

  return (
    <section id="contacto" className="bg-theme-bg-secondary py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Contact Content - Two Columns Compact */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-theme-text-dark">
                ¿Necesitas ayuda?
              </h2>
              <p className="text-base lg:text-lg text-theme-text-muted leading-relaxed">
                ¿Tienes preguntas sobre SkillLink, necesitas ayuda técnica o
                quieres saber más sobre nuestros servicios? Nuestro equipo está
                listo para asistirte.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-theme-button-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-theme-button-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text-dark text-sm">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@skilllink.com"
                    className="text-theme-text-muted hover:text-theme-button-primary transition-colors text-sm"
                  >
                    hello@skilllink.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-theme-button-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-theme-button-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text-dark text-sm">
                    Teléfono
                  </h3>
                  <a
                    href="tel:+11234567890"
                    className="text-theme-text-muted hover:text-theme-button-primary transition-colors text-sm"
                  >
                    (123) 456 - 789
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-theme-button-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-theme-button-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-theme-text-dark text-sm">
                    Ubicación
                  </h3>
                  <address className="text-theme-text-muted not-italic text-sm">
                    794 Mcallister St
                    <br />
                    San Francisco, 94102
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Más compacto */}
          <div className="bg-gray-100 rounded-xl shadow-sm p-5 lg:p-6 self-start">
            <form onSubmit={onSubmit} className="space-y-3">
              {/* Full Name */}
              <InputField
                label="Nombre completo"
                type="text"
                placeholder="Ingresa tu nombre completo"
                register={register('fullName', {
                  required: 'El nombre es requerido',
                })}
                error={errors.fullName?.message as string}
                labelColor="text-theme-text-dark"
                inputBg="bg-white"
              />

              {/* Email */}
              <InputField
                label="Email"
                type="email"
                placeholder="example@email.com"
                register={register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email inválido',
                  },
                })}
                error={errors.email?.message as string}
                labelColor="text-theme-text-dark"
                inputBg="bg-white"
              />

              {/* Phone */}
              <InputField
                label="Teléfono (opcional)"
                type="tel"
                placeholder="(123) 456 - 789"
                register={register('phone')}
                error={errors.phone?.message as string}
                labelColor="text-theme-text-dark"
                inputBg="bg-white"
              />

              {/* Message - Textarea más pequeño */}
              <TextareaField
                label="Mensaje"
                placeholder="Escribe tu mensaje aquí..."
                rows={3}
                register={register('message', {
                  required: 'El mensaje es requerido',
                })}
                error={errors.message?.message as string}
                labelColor="text-theme-text-dark"
                inputBg="bg-white"
              />

              {/* Submit Button - Más compacto */}
              <button
                type="submit"
                className="w-full bg-theme-button-primary hover:bg-theme-button-primary/90 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
