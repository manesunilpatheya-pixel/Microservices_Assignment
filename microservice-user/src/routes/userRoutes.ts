import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

export const userRoutes = Router();

// POST /api/users -> create new user
userRoutes.post('/', createUser);

// GET /api/users -> fetch all users
userRoutes.get('/', getUsers);
