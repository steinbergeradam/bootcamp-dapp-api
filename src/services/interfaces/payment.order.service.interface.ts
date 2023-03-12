import { PaymentOrder } from "../../models/payment.order.model";

export interface IPaymentOrderService {
  createPaymentOrder(value: number, secret : string): number;
  getPaymentOrders(): PaymentOrder[];
}