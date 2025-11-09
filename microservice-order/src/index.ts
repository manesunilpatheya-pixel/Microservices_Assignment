import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectProducer, disconnectProducer } from './kafka/producer';
import { orderRoutes } from './routes/orderRoutes';
import { config } from './config';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register order routes
app.use('/api/orders', orderRoutes);

const PORT = config.port || 4001;

// Connect to MongoDB
mongoose.connect(config.mongoUrl)
    .then(async () => {
        console.log('MongoDB connected');

        // Connect Kafka producer
        await connectProducer();

        // Start Express server
        app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Graceful shutdown
const gracefulShutdown = async () => {
    console.log('Shutting down service...');
    await disconnectProducer(); // disconnect Kafka
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
