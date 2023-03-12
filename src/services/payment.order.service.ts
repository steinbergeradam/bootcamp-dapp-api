import { ethers } from "ethers";
import { PaymentOrder } from "../models/payment.order.model";
import { BaseService } from "./abstract/base.service";
import { IPaymentOrderService } from './interfaces/payment.order.service.interface';

export class PaymentOrderService extends BaseService implements IPaymentOrderService {
  private paymentOrders = [];
  
  createPaymentOrder(value: number, secret : string): number {
    const newPaymentOrder = new PaymentOrder();
    newPaymentOrder.value = value;
    newPaymentOrder.secret = secret;
    newPaymentOrder.id = this.paymentOrders.length;
    this.paymentOrders.push(newPaymentOrder);
    return newPaymentOrder.id;
  }

  getPaymentOrders() {
    return this.paymentOrders;
  }
}
