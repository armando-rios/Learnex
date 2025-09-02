import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'Debe ser un email o nombre de usuario válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  fullname: z.string().min(1, 'El nombre completo es requerido'),
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
