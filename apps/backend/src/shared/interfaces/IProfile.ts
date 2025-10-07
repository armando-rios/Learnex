/**
 * Entidad de Profile - Independiente de la base de datos
 */
export interface IProfile {
  id: string;
  userId: string;
  fullname: string;
  username: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
