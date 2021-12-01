// Rotas para serem usadas em página de profile de usuário

import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const router = Router();

const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

// Edita conta do usuário
router.put('/', async (req, res, next) => {
  try {
    const { body } = req;
    const editedUser = await authService.editUser(req.user.id, body);
    res.json(editedUser);
  } catch (error) {
    next(error);
  }
});

// Deleta conta do usuário
router.delete('/', async (req, res, next) => {
  try {
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
