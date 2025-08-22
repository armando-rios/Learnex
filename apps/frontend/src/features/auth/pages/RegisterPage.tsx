import { ButtonPrimary } from '../../../shared/components/Button';
import AuthFormLayout from '../components/AuthFormLayout';
import InputField from '../components/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation/validationSchemas';
import InputPassword from '../components/InputPassword';
import { registerService } from '../services/authService';
import useAuthStore from '../store/useAuthStore';

const RegisterPage = () => {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await registerService(data);
      setAuthenticated(response);

      // Redirigir automáticamente al dashboard después del registro exitoso
      navigate('/panel');
    } catch (error) {
      console.error('Error durante el registro:', error);
      alert('Error al registrarse. Por favor, verifica tus datos.');
    }
  });

  return (
    <AuthFormLayout
      title="Regístrate"
      description="Crea una cuenta para desbloquear funciones exclusivas."
      image="/images/ilustracion-register.svg"
      showBackButton={true}
    >
      <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <InputField
          label="Nombre de Usuario"
          type="text"
          placeholder="Ingresa tu nombre de usuario"
          register={register('username', { required: true })}
          error={errors.username?.message}
          labelColor="text-white"
          inputBg="bg-white"
        />
        <InputField
          label="Nombre Completo"
          type="text"
          placeholder="Ingresa tu nombre completo"
          register={register('fullName', { required: true })}
          error={errors.fullName?.message}
          labelColor="text-white"
          inputBg="bg-white"
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Ingresa tu email"
          register={register('email', { required: true })}
          error={errors.email?.message}
          labelColor="text-white"
          inputBg="bg-white"
        />

        <InputPassword
          register={register('password', { required: true })}
          error={errors.password?.message}
          labelColor="text-white"
          inputBg="bg-white"
        />

        <ButtonPrimary title="Regístrate" styles="mt-3" />

        <p className="flex gap-2 flex-wrap justify-center text-center text-sm text-white mt-2">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/iniciar-sesion" className="font-semibold hover:underline">
            Iniciar sesión →
          </Link>
        </p>
      </form>
    </AuthFormLayout>
  );
};

export default RegisterPage;
