import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { ButtonPrimary } from '../../../shared/components/Button';
import InputField from '../components/InputField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/validationSchemas';
import InputPassword from '../components/InputPassword';
import { loginService } from '../services/authService';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginService(data);
      setAuthenticated(response);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  });

  return (
    <AuthLayout
      title="Inicia Sesión"
      description="¡Bienvenido de nuevo! Por favor, inicia sesión para acceder a tu cuenta."
      image="/images/ilustracion-login.svg"
      showBackButton={true}
    >
      <form
        className="w-full bg-theme-bg-tertiary flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <InputField
          label="Email"
          type="email"
          placeholder="Ingresa tu Email"
          register={register('email')}
          error={errors.email?.message}
          labelColor="text-white"
          inputBg="bg-white"
        />

        <InputPassword
          register={register('password')}
          error={errors.password?.message}
          labelColor="text-white"
          inputBg="bg-white"
        />

        <div className="flex flex-wrap gap-2 items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label className="flex items-center gap-2 text-white">
              Recuérdame
            </label>
          </div>
          <Link to="#" className="text-white hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <ButtonPrimary title="Iniciar Sesión" styles="mt-3" />

        <p className="flex gap-2 flex-wrap justify-center text-center text-sm text-white mt-2">
          ¿No tienes una cuenta?{' '}
          <Link to="/registrarse" className="font-semibold hover:underline">
            Registrarse →
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
