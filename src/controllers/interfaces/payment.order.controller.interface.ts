import { PaymentOrder } from "../../models/payment.order.model";

export interface IPaymentOrderController {
  createPaymentOrder(paymentOrder: PaymentOrder): number;
  getPaymentOrders(): PaymentOrder[];
}