import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Por favor ingrese un nombre'],
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
      default: 'https://github.com/armando-rios.png',
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, 'Por favor ingrese una URL de imagen válida'],
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
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model('User', userSchema);

export default User;
