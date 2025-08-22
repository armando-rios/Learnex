import { Schema, model } from 'mongoose';
import { IProfile } from '../interfaces/IProfile';

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
    },
    username: {
      type: String,
      required: [true, 'Por favor ingrese un nombre de usuario'],
      unique: true,
      trim: true,
      minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
      match: [
        /^[a-zA-Z0-9_]+$/,
        'El nombre de usuario solo puede contener letras, números y guiones bajos',
      ],
    },
    imageUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    ocupation: {
      type: String,
    },
    experience: {
      type: String,
    },
    skills: {
      type: [String],
    },
    interests: {
      type: [String],
    },
    socialLinks: {
      type: {
        linkedin: String,
        github: String,
      },
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    countryId: {
      type: String,
    },
    certifications: {
      type: [String],
    },
    password: {
      type: String,
    },
    achievements: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const Profile = model<IProfile>('Profile', profileSchema);

export default Profile;
