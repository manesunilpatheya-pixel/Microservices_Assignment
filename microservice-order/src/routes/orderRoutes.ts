import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController';

export const orderRoutes = Router();

orderRoutes.post('/', createOrder);
orderRoutes.get('/', getOrders);
