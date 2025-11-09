import { Kafka, Partitioners, Producer } from "kafkajs";
import { config } from "../config";

let producer: Producer;
let isConnected = false;

// Connect Kafka producer once
export const connectProducer = async () => {
    if (isConnected) return;

    try {
        const kafka = new Kafka({
            clientId: "user-service",
            brokers: [config.kafkaBroker], // Broker from env
        });

        producer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner,
        });

        await producer.connect();
        isConnected = true;

        console.log("Kafka producer connected");
    } catch (err) {
        console.error("Kafka producer connection failed:", err);
    }
};

// Send message to Kafka topic
export const sendMessage = async (topic: string, message: any) => {
    try {
        await connectProducer(); // Ensure producer is connected

        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });

        console.log(`Kafka message sent to topic ${topic}`, message);
    } catch (err) {
        console.error("Kafka message error:", err);
    }
};

// Disconnect producer
export const disconnectProducer = async () => {
    if (!isConnected) return;
    await producer.disconnect();
    console.log("Kafka producer disconnected");
};
