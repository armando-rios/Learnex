import api from '../../../shared/lib/axios';
import type {
  LoginFormData,
  RegisterFormData,
} from '../validation/validationSchemas';
import { loginSchema, registerSchema } from '../validation/validationSchemas';

// Función para iniciar sesión
export async function loginService(userData: LoginFormData) {
  const finalData = loginSchema.parse(userData);
  try {
    const response = await api.post('/auth/login', finalData);
    localStorage.setItem('hasAttemptedLogin', 'true');
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    throw error;
  }
}

// Función para registrar un nuevo usuario
export async function registerService(userData: RegisterFormData) {
  const finalData = registerSchema.parse(userData);
  try {
    // Paso 1: Registrar el usuario
    const response = await api.post('/auth/register', finalData);
    localStorage.setItem('hasAttemptedLogin', 'true');
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error('Error de registro:', error);
    throw error;
  }
}
