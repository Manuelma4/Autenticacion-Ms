import mongoose from 'mongoose';

export interface RoleDocument extends mongoose.Document {
  idRol: number;
  nombreRol: string;
}

const roleSchema = new mongoose.Schema({
  idRol: { type: Number, required: true },
  nombreRol: { type: String, required: true }
});

const Role = mongoose.model<RoleDocument>('Role', roleSchema);

export default Role;