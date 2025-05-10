// server/src/models/User.model.ts
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  mobileNo: string;
  image: string;
  role: 'owner' | 'farm_laborer';
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobileNo: { type: String, required: true },
  image: { type: String },
  role: { type: String, enum: ['owner', 'farm_laborer'], required: true },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);