/**
 * Contract/Interface for Profile Repository
 */
export interface IProfileRepository {
  findById(id: string): Promise<ProfileData | null>;
  findByUserId(userId: string): Promise<ProfileData | null>;
  findByUsername(username: string): Promise<ProfileData | null>;
  create(data: CreateProfileData): Promise<ProfileData>;
  update(id: string, data: Partial<CreateProfileData>): Promise<ProfileData | null>;
}

export interface ProfileData {
  id: string;
  userId: string;
  fullname: string;
  username: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProfileData {
  userId: string;
  fullname: string;
  username: string;
  image?: string;
}
