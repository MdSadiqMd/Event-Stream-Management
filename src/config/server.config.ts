import dotenv from "dotenv";

dotenv.config();

export default {
    KAFKA_PORT: process.env.KAFKA_PORT || "localhost:9092"
};