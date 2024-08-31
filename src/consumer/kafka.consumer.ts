import { KafkaClient, Consumer } from "kafka-node";

import { serverConfig } from "../config";

const client = new KafkaClient({ kafkaHost: serverConfig.KAFKA_PORT as string });
const consumer = new Consumer(
    client,
    [
        {
            topic: "payments",
            partition: 0
        }
    ],
    {
        autoCommit: true,
        groupId: "inventory-group"
    }
);

export default consumer;