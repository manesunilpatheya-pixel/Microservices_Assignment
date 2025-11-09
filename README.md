🚀 Microservices Backend Assignment


Stack: Node.js + TypeScript + MongoDB + Kafka + Azure SignalR + Docker

This project implements a microservice architecture with three services:

User Service: Manages users with MongoDB and publishes events via Kafka

Order Service: Manages orders with MongoDB and publishes events via Kafka

Notification Service: Consumes Kafka events and broadcasts notifications using Azure SignalR

All services are independently deployable and Dockerized.



📁 microservices-backend/
│
├─ microservice-user/
│  ├─ src/                     # Source code
│  ├─ Dockerfile               # Docker build instructions
│  ├─ .env.local               # Environment variables for local development
│  ├─ .env.docker              # Environment variables for Docker deployment
│  └─ package.json             # Node.js project dependencies & scripts
│
├─ microservice-order/
│  ├─ src/
│  ├─ Dockerfile
│  ├─ .env.local
│  ├─ .env.docker
│  └─ package.json
│
├─ microservice-notification/
│  ├─ src/
│  ├─ Dockerfile
│  ├─ .env.local
│  ├─ .env.docker
│  └─ package.json
│
└─ docker-compose.yml          # Orchestrates all services and dependencies




⚙️ Local Development
1️⃣ Install Dependencies
cd microservice-user && npm install
cd ../microservice-order && npm install
cd ../microservice-notification && npm install

2️⃣ Configure Environment Variables

Each service has its own .env.local. Example:

User Service

NODE_ENV=development
PORT=4001
MONGO_URL=mongodb://127.0.0.1:27017/user_db
KAFKA_BROKER=127.0.0.1:9092
KAFKA_GROUP_ID=user-service-group


Order Service

PORT=4002
MONGO_URL=mongodb://127.0.0.1:27017/order_db
KAFKA_BROKER=127.0.0.1:9092
KAFKA_GROUP_ID=order-service-group


Notification Service

PORT=4003
MONGO_URL=mongodb://127.0.0.1:27017/notification_db
KAFKA_BROKER=127.0.0.1:9092
KAFKA_GROUP_ID=notification-service-group
AZURE_SIGNALR_CONNECTION_STRING=<your-signalr-connection-string>
SIGNALR_HUB=notifications


3️⃣ Run Services Locally
cd microservice-user && npm run dev
cd ../microservice-order && npm run dev
cd ../microservice-notification && npm run dev


Ports:

User Service → 4001

Order Service → 4002

Notification Service → 4003



🐳 Docker Setup
# Build and start all containers
docker-compose up --build

# List running containers
docker ps

# View logs
docker-compose logs -f


Expected containers: MongoDB, Zookeeper, Kafka, and all three microservices.



🗄️ MongoDB Commands
Local MongoDB
# Start MongoDB service
sudo systemctl start mongod

# Optional: enable MongoDB to start on boot
sudo systemctl enable mongod

# Check MongoDB status
sudo systemctl status mongod

# Connect to a database
mongosh "mongodb://127.0.0.1:27017/user_db"

# Switch database
use order_db

# Show collections
show collections;

# General CRUD operations
db.users.find();
db.orders.find();
db.<collection>.insertOne({ field: "value" });
db.<collection>.updateOne({ field: "value" }, { $set: { field: "newValue" } });
db.<collection>.deleteOne({ field: "value" });




MongoDB Inside Docker
# Connect to running Mongo container
docker exec -it <mongo_container_name> mongosh

# Example:
docker exec -it cognitus-mongo mongosh

# Then inside mongosh, switch DB and run CRUD commands
use notification_db
show collections;




📌 Sample API Flow

Create a user

POST http://localhost:4001/api/users
Body:
{ "name": "sunil", "email": "sunil@example.com" }


Create an order

POST http://localhost:4002/api/orders
Body:
{
  "userId": "<USER_ID>",
  "items": [{ "product": "Laptop", "qty": 1 }]
}


Fetch notifications

GET http://localhost:4003/api/notifications




🛠️ Useful Commands Summary
# Build Docker images
docker-compose build

# Start all containers (detached mode)
docker-compose up --build -d

# Stop all containers
docker-compose down

# Stop, remove volumes & orphaned containers
docker-compose down --volumes --remove-orphans

# Follow logs in real-time
docker-compose logs -f <service_name>
docker logs <container_name>
