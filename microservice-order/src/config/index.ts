import dotenv from "dotenv";

// Load .env file only when running locally; Docker already injects env vars.
if (!process.env.DOCKER) {
  dotenv.config({ path: ".env.local" });
}

export const config = {
  port: Number(process.env.PORT) || 4001,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/userdb",
  kafkaBroker: process.env.KAFKA_BROKER || "kafka:9092",
};

console.log("=======================================");
console.log(` Running inside Docker: ${process.env.DOCKER === "true"}`);
console.log(` Loading env manually? ${process.env.DOCKER ? "NO (Docker handles it)" : "YES (.env.local)"}`);
console.log(` Kafka Broker: ${config.kafkaBroker}`);
console.log("=======================================");
