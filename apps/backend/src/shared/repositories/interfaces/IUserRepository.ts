/**
 * Contract/Interface for User Repository
 */
export interface IUserRepository {
  findById(id: string): Promise<UserData | null>;
  findByEmail(email: string): Promise<UserData | null>;
  findByUsername(username: string): Promise<UserData | null>;
  findByEmailOrUsername(login: string): Promise<UserData | null>;
  create(data: CreateUserData): Promise<UserData>;
  existsByEmailOrUsername(email: string, username: string): Promise<boolean>;
  verifyPassword(user: UserData, password: string): Promise<boolean>;
}

// Datos de usuario (sin depender de Mongoose)
export interface UserData {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Datos para crear usuario
export interface CreateUserData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  image?: string;
}
