import { Document, ObjectId } from 'mongoose';

export interface IProfile extends Document {
  _id: ObjectId;
  userId: ObjectId;
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
  contactEmail?: string;
  contactPhone?: string;
  countryId?: string;
  certifications?: string[];
  password?: string;
  achievements?: string[];
  createdAt: Date;
  updatedAt: Date;
}
