import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getSingleUser);
router.patch('/:userId', userControllers.updateSingleUser);
router.delete('/:userId', userControllers.deleteUser);
router.put('/:userId/orders', userControllers.addOrder);
router.get('/:userId/orders', userControllers.getAllOrder);
router.get('/:userId/orders/total-price', userControllers.getTotalPrice);

export const userRoutes = router;
