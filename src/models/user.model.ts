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
  idRol: { type: Number, required: true},
  password: { type: String, required: true },
  email: { type: String, required: true },
},{
  timestamps: true,
  versionKey: false,
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
