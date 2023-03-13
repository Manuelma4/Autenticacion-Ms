import { Request, Response } from 'express';
import User from '../models/user.model';

const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'ErrorgetAll' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { idRol, password, email, username } = req.body;

      // Check if username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Find the last user in the database to increment the idUsuario
      const lastUser = await User.findOne().sort({ _id: -1 });
      const idUsuario = lastUser ? lastUser.idUsuario + 1 : 1;

      const user = new User({ idUsuario, username, idRol, password, email });
      await user.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'ErrorCreate' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('role');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Errorgetbyid' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, idRol, password, email } = req.body;
      const user = await User.findById(id).populate('role');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.username = username;
      user.idRol = idRol;
      user.password = password;
      user.email = email;
      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Errorupdate' });
    }
  }
  ,

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error); // registrar el error en la consola
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};

export default userController;