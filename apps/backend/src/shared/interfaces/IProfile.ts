import { Document, ObjectId } from 'mongoose';

export interface IProfile extends Document {
  _id: ObjectId;
  userId: ObjectId;
  fullname: string;
  username: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
