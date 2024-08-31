class PaymentEvent {
    order: string;
    status: string;
    amount: number;
    itemId: string;
    quantity: number;

    constructor(orderId: string, status: string, amount: number, itemId: string, quantity: number) {
        this.order = orderId;
        this.status = status;
        this.amount = amount;
        this.itemId = itemId;
        this.quantity = quantity;
    }
}

export default PaymentEvent;