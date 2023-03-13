import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';


const authController = {
  async register(req: Request, res: Response) {
    try {
      const { idUsuario, username, idRol, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ idUsuario, username, idRol, password: hashedPassword, email });
      await user.save();
      res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
      res.status(500).json({message: "Fallo al registrar usuario"});
    }
  },


  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET ?? 'defaultSecret';
      const token = jwt.sign({ username }, secretOrPrivateKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  },

  async changePassword(req: Request, res: Response) {
    try {
      const { username, oldPassword, newPassword } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Fallo al cambiar la contraseña' });
    }
  },

  async logout(req: Request, res: Response) {
    try {
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error al salir' });
    }
  }
};

export default authController;