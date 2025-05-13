import mongoose from "mongoose";
import { OrderStatus } from "@himanshusarmaorg/common";
import { ITicketSchema } from "./TicketModel";
interface IOrderSchema extends mongoose.Document {
    status: OrderStatus;
    userId: mongoose.Schema.Types.ObjectId;
    ticket: ITicketSchema;
    version: number;
    expiresAt: Date;
}
interface IOrderModel extends mongoose.Model<IOrderSchema> {
}
declare const OrderModel: IOrderModel;
export default OrderModel;
export { IOrderSchema, IOrderModel };
