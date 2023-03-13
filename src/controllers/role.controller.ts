import { Request, Response } from 'express';
import Role from '../models/role.model';

const roleController = {
  async getAll(req: Request, res: Response) {
    try {
      const roles = await Role.find();
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { idRol, nombreRol } = req.body;
      const existingRole = await Role.findOne({ idRol });
      if (existingRole) {
        return res.status(400).json({ error: 'Role already exists' });
      }
      const role = new Role({ idRol, nombreRol });
      await role.save();
      res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear rol' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json({ role });
    } catch (error) {
      res.status(500).json({ error: 'Rol no encontrado' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { idRol, nombreRol } = req.body;
      const existingRole = await Role.findOne({ idRol });
      if (existingRole && existingRole.id != req.params.id) {
        return res.status(400).json({ error: 'Role already exists' });
      }
      const role = await Role.findByIdAndUpdate(
        req.params.id,
        { idRol, nombreRol },
        { new: true }
      );
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json({ message: 'Role updated successfully', role });
    } catch (error) {
      res.status(500).json({ error: 'Fallo al actualizar rol' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const role = await Role.findByIdAndDelete(req.params.id);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json({ message: 'Role deleted successfully', role });
    } catch (error) {  res.status(500).json({ error: 'Error al borrar el rol' });
    }
},
};

export default roleController;