import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  fullName: string;
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}
