import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  idUsuario: number;
  username: string;
  idRol: number;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema({
  idUsuario: { type: Number, required: true },
  username: { type: String, required: true },
  idRol: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
