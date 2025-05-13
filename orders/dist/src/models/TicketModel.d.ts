import mongoose from "mongoose";
interface ITicketSchema extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(this: ITicketSchema): Promise<boolean>;
}
interface ITicketModel extends mongoose.Model<ITicketSchema> {
    findByEvent(event: {
        id: string;
        version: number;
    }): Promise<ITicketSchema | null>;
}
declare const TicketModel: ITicketModel;
export default TicketModel;
export { ITicketSchema, ITicketModel };
