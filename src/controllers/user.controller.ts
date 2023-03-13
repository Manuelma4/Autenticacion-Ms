import { Request, Response } from 'express';
import User from '../models/user.model';

const userController = {
  async getAll(req: Request, res: Response) {
    try {
      const users = await User.find().populate('role');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'ErrorgetAll' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { username, idRol, password, email } = req.body;
      const user = new User({ username, idRol, password, email });
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
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!('_id' in user)) {
        throw new Error('Invalid user object');
      }
      await user.delete();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error); // registrar el error en la consola
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};

export default userController;