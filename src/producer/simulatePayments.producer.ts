import { KafkaClient, Producer } from "kafka-node";

import { logger, serverConfig } from "../config";

const client = new KafkaClient({ kafkaHost: serverConfig.KAFKA_PORT as string });
const producer = new Producer(client);

producer.on("ready", () => {
    const paymentEvent = JSON.stringify({
        orderId: `order-${Date.now()}`,
        status: "SUCCESS",
        amount: 150,
        quantity: 1
    });

    const payloads = [
        {
            topic: "payments",
            messages: paymentEvent
        }
    ];

    producer.send(payloads, (error: any, data: any) => {
        if (error) {
            logger.error(`Error in sending order ${payloads[0].messages} with Error: `, error);
        } else {
            logger.info(`Messages Sent Successfully: `, data);
        }
    });
});

producer.on("error", (error: any) => {
    logger.error(`Error in Initialising Kafka Producer: `, error);
});