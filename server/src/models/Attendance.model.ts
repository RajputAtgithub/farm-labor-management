// server/src/models/Attendance.model.ts
import mongoose, { Document } from 'mongoose';

export interface IAttendance extends Document {
  laborer: mongoose.Types.ObjectId;
  application: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  markedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AttendanceSchema = new mongoose.Schema<IAttendance>({
  laborer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'leave'], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);