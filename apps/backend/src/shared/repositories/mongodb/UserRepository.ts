import UserModel, { type IUserDocument } from './models/User';
import type { IUserRepository, UserData, CreateUserData } from '../interfaces/IUserRepository';

/**
 * Implementation of IUserRepository using MongoDB and Mongoose.
 * This class provides methods to interact with the User collection in MongoDB.
 */
export class MongoUserRepository implements IUserRepository {
  async findById(id: string): Promise<UserData | null> {
    const user = await UserModel.findById(id);
    return user ? this.toUserData(user) : null;
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const user = await UserModel.findOne({ email });
    return user ? this.toUserData(user) : null;
  }

  async findByUsername(username: string): Promise<UserData | null> {
    const user = await UserModel.findOne({ username });
    return user ? this.toUserData(user) : null;
  }

  async findByEmailOrUsername(login: string): Promise<UserData | null> {
    const user = await UserModel.findOne({
      $or: [{ email: login }, { username: login }],
    });
    return user ? this.toUserData(user) : null;
  }

  async create(data: CreateUserData): Promise<UserData> {
    const user = await UserModel.create(data);
    return this.toUserData(user);
  }

  async existsByEmailOrUsername(email: string, username: string): Promise<boolean> {
    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    return user !== null;
  }

  async verifyPassword(userData: UserData, password: string): Promise<boolean> {
    const user = await UserModel.findById(userData.id);
    if (!user) return false;
    return user.comparePassword(password);
  }

  private toUserData(user: IUserDocument): UserData {
    return {
      id: user._id.toString(),
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
