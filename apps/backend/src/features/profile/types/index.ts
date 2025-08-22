export interface UpdateProfileRequest {
  fullName?: string;
  username?: string;
  bio?: string;
  location?: string;
  ocupation?: string;
  experience?: string;
  skills?: string[];
  interests?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  countryId?: string;
  certifications?: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateAvatarRequest {
  imageUrl?: string;
}

export interface PublicProfileResponse {
  id: string;
  fullName: string;
  username: string;
  imageUrl?: string;
  bio?: string;
  location?: string;
  ocupation?: string;
  experience?: string;
  skills?: string[];
  interests?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
  };
  certifications?: string[];
  achievements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PrivateProfileResponse extends PublicProfileResponse {
  contactEmail?: string;
  contactPhone?: string;
  countryId?: string;
}