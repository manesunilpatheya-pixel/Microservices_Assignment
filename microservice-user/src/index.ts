import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { connectProducer, disconnectProducer } from './kafka/producer';
import { config } from './config';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register user routes
app.use('/api/users', userRoutes);

const PORT = config.port || 4001;

// Connect to MongoDB
mongoose.connect(config.mongoUrl)
    .then(async () => {
        console.log('MongoDB connected');

        // Connect Kafka producer
        await connectProducer();

        // Start server
        app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('Shutting down service...');
    await disconnectProducer(); // Disconnect Kafka
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
