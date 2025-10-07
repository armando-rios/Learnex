import ProfileModel, { type IProfileDocument } from './models/Profile';
import type {
  IProfileRepository,
  ProfileData,
  CreateProfileData,
} from '../interfaces/IProfileRepository';

/**
 * Implementation of IProfileRepository using MongoDB and Mongoose.
 */
export class MongoProfileRepository implements IProfileRepository {
  async findById(id: string): Promise<ProfileData | null> {
    const profile = await ProfileModel.findById(id);
    return profile ? this.toProfileData(profile) : null;
  }

  async findByUserId(userId: string): Promise<ProfileData | null> {
    const profile = await ProfileModel.findOne({ userId });
    return profile ? this.toProfileData(profile) : null;
  }

  async findByUsername(username: string): Promise<ProfileData | null> {
    const profile = await ProfileModel.findOne({ username });
    return profile ? this.toProfileData(profile) : null;
  }

  async create(data: CreateProfileData): Promise<ProfileData> {
    const profile = await ProfileModel.create(data);
    return this.toProfileData(profile);
  }

  async update(id: string, data: Partial<CreateProfileData>): Promise<ProfileData | null> {
    const profile = await ProfileModel.findByIdAndUpdate(id, data, { new: true });
    return profile ? this.toProfileData(profile) : null;
  }

  private toProfileData(profile: IProfileDocument): ProfileData {
    return {
      id: profile._id.toString(),
      userId: profile.userId.toString(),
      fullname: profile.fullname,
      username: profile.username,
      image: profile.image,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
