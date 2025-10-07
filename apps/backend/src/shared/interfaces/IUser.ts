/**
 * Entidad de Usuario - Independiente de la base de datos
 */
export interface IUser {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
