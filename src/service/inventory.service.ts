import consumer from "../consumer/kafka.consumer";
import PaymentEvent from "../types/paymentEvent.types";
import { inventory } from "../constants/inventory.constants";
import { logger } from "../config";

const updateInventory = (paymentEvent: PaymentEvent) => {
    const quantityToReduce: number = paymentEvent.quantity;

    if (inventory["item-1"] && paymentEvent.status === "SUCCESS") {
        inventory["item-1"] = inventory["item-1"] - quantityToReduce;
    } else if (inventory["item-1"] && paymentEvent.status !== "SUCCESS") {
        logger.error(`Payment of OrderId ${paymentEvent.order} Failed`);
    }
};

consumer.on("message", (message: any) => {
    try {
        const paymentEventReceived = JSON.parse(message.value);
        updateInventory(paymentEventReceived);
    } catch (error) {
        logger.error(`Consumer Failed to Process Message: `, error);
    }
});

consumer.on("error", (error: any) => {
    logger.error(`Error in Kafka Consumer: `, error);
});