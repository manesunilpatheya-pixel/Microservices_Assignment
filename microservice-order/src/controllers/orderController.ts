import { Request, Response } from 'express';
import { Order } from '../models/Order';
import { sendMessage } from '../kafka/producer';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, product, quantity } = req.body;
        const order = new Order({ userId, product, quantity });
        await order.save();

        // Send order info to Kafka topic
        await sendMessage('order-topic', { orderId: order._id, userId, product, quantity });

        res.status(200).json({ message: 'Order created successfully', order });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Get all orders
export const getOrders = async (_req: Request, res: Response) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
