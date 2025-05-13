import mongoose from "mongoose";
import { OrderStatus } from "@himanshusarmaorg/common";
interface IOrderSchema extends mongoose.Document {
    status: OrderStatus;
    userId: mongoose.Schema.Types.ObjectId;
    price: number;
    version: number;
}
interface IOrderModel extends mongoose.Model<IOrderSchema> {
    findByEvent(event: {
        id: string;
        version: number;
    }): Promise<IOrderSchema | null>;
}
declare const OrderModel: IOrderModel;
export default OrderModel;
export { IOrderSchema, IOrderModel };
