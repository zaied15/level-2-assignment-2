import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateSingleUser);
router.delete('/:userId', userControllers.deleteUser);
// Order routes
router.put('/:userId/orders', userControllers.addOrder);
router.get('/:userId/orders', userControllers.getAllOrder);
router.get('/:userId/orders/total-price', userControllers.getTotalPrice);

export const userRoutes = router;
