import api from '../../../shared/lib/axios';
import type {
  LoginFormData,
  RegisterFormData,
} from '../validation/validationSchemas';
import { loginSchema, registerSchema } from '../validation/validationSchemas';

// Función para iniciar sesión
export async function loginService(userData: LoginFormData) {
  loginSchema.parse(userData);
  try {
    const response = await api.post('/auth', userData);
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    throw error; // Propagar el error para que sea manejado por la UI
  }
}

// Función para registrar un nuevo usuario
export async function registerService(userData: RegisterFormData) {
  const parsedData = registerSchema.parse(userData);
  const finalData = {
    ...parsedData,
    role: parsedData.role || 'ROLE_USER', // Asignar ROLE_USER por defecto si no se especifica
  };
  try {
    // Paso 1: Registrar el usuario
    const registerResponse = await api.post('/register', finalData);

    // Verificar que el registro fue exitoso (status 200 o 201)
    if (registerResponse.status === 200 || registerResponse.status === 201) {
      // Paso 2: Hacer login automáticamente después del registro exitoso
      const loginData = {
        email: parsedData.email,
        password: parsedData.password,
      };

      const loginResponse = await api.post('/auth', loginData);

      // Guardar token y datos del usuario del login
      localStorage.setItem('authToken', loginResponse.data.token);
      localStorage.setItem('userData', JSON.stringify(loginResponse.data.user));

      return loginResponse.data.user;
    } else {
      throw new Error(
        'Error en el registro: respuesta inesperada del servidor'
      );
    }
  } catch (error) {
    console.error('Error de registro:', error);
    throw error;
  }
}
