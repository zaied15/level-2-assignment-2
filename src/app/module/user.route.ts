import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getSingleUser);
router.patch('/:userId', userControllers.updateSingleUser);
router.delete('/:userId', userControllers.deleteUser);

export const userRoutes = router;
