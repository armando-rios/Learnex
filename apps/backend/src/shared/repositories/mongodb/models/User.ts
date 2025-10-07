import { Schema, model, Document } from 'mongoose';

export interface IUserDocument extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    fullname: {
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
    email: {
      type: String,
      required: [true, 'Por favor ingrese un nombre de usuario'],
      match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo electrónico válido'],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
      required: [true, 'Por favor ingrese una contraseña'],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  try {
    this.password = await Bun.password.hash(this.password, {
      algorithm: 'bcrypt',
      cost: 12,
    });
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await Bun.password.verify(enteredPassword, this.password, 'bcrypt');
};

const UserModel = model<IUserDocument>('User', userSchema);

export default UserModel;
