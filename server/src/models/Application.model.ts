// server/src/models/Application.model.ts
import mongoose, { Document } from 'mongoose';

export interface IApplication extends Document {
  owner: mongoose.Types.ObjectId;
  address: string;
  laborerNeeded: number;
  duration: string; // e.g., "5 days", "2 weeks"
  paymentPerLaborer: number;
  description: string;
  status: 'open' | 'closed';
  applicants: Array<{
    laborer: mongoose.Types.ObjectId;
    status: 'pending' | 'accepted' | 'rejected';
    appliedAt: Date;
  }>;
  createdAt: Date;
}

const ApplicationSchema = new mongoose.Schema<IApplication>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  laborerNeeded: { type: Number, required: true },
  duration: { type: String, required: true },
  paymentPerLaborer: { type: Number, required: true },
  description: { type: String },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  applicants: [{
    laborer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    appliedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IApplication>('Application', ApplicationSchema);