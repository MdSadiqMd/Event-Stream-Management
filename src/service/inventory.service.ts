import consumer from "../consumer/kafka.consumer";
import PaymentEvent from "../types/paymentEvent.types";
import { inventory } from "../constants/inventory.constants";
import { logger } from "../config";

const updateInventory = (paymentEvent: PaymentEvent) => {
    const quantityToReduce: number = paymentEvent.quantity;
    const itemId: string = paymentEvent.itemId;

    if (inventory[itemId] && paymentEvent.status === "SUCCESS") {
        inventory[itemId] -= quantityToReduce;
        logger.info(`Updated Inventory ${inventory[itemId]}`);
    } else if (inventory[itemId] && paymentEvent.status !== "SUCCESS") {
        logger.error(`Payment of OrderId ${paymentEvent.order} Failed`);
    }
};

consumer.on("message", (message: any) => {
    try {
        const paymentEventReceived: PaymentEvent = JSON.parse(message.value);
        updateInventory(paymentEventReceived);
    } catch (error) {
        logger.error(`Consumer Failed to Process Message: `, error);
    }
});

consumer.on("error", (error: any) => {
    logger.error(`Error in Kafka Consumer: `, error);
});