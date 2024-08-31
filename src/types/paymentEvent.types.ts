class PaymentEvent {
    order: string;
    status: string;
    amount: number;
    quantity: number;

    constructor(orderId: string, status: string, amount: number, quantity: number) {
        this.order = orderId;
        this.status = status;
        this.amount = amount;
        this.quantity = quantity;
    }
}

export default PaymentEvent;