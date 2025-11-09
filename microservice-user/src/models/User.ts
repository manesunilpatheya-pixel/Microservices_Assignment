import { Schema, model } from 'mongoose';

// Define User schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

export const User = model('User', userSchema);
