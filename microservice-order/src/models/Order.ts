import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    userId: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Order = model('Order', orderSchema);
