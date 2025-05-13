import mongoose from "mongoose";
interface ITicketSchema extends mongoose.Document {
    title: string;
    price: number;
    userId: mongoose.Schema.Types.ObjectId;
    orderId?: mongoose.Schema.Types.ObjectId;
    version: number;
}
interface ITicketModel extends mongoose.Model<ITicketSchema> {
}
declare const TicketModel: ITicketModel;
export default TicketModel;
export { ITicketSchema, ITicketModel };
