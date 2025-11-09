import { Request, Response } from 'express';
import { User } from '../models/User';
import { sendMessage } from '../kafka/producer';

// Create new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        // Save user in MongoDB
        const user = new User({ name, email });
        await user.save();
        console.log(`User created: ${user.name} (${user._id})`);

        // Send message to Kafka topic (non-blocking)
        try {
            await sendMessage('user-topic', { id: user._id, name: user.name });
            console.log(`Kafka message sent for user "${user.name}"`);
        } catch (kafkaErr: any) {
            console.warn(`Kafka message failed: ${kafkaErr.message}`);
        }

        // Respond with success
        return res.status(200).json({
            message: 'User created successfully',
            user,
        });
    } catch (error: any) {
        console.error("createUser failed:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
