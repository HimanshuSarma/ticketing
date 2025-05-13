import { IOrderModel } from "../models/OrderModel"
import { IPaymentModel } from "../models/PaymentModel"

interface IDBModels {
  ORDER: IOrderModel,
  PAYMENT: IPaymentModel
};

export type {
  IDBModels
}