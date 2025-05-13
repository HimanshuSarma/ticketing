import { OrderStatus } from "@himanshusarmaorg/common";
import mongoose, { HydratedDocument } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ITicketSchema extends mongoose.Document {
  title: string,
  price: number,
  version: number,
  isReserved(this: ITicketSchema): Promise<boolean>; // Explicitly define isReserved
};

interface ITicketModel extends mongoose.Model<ITicketSchema> {
  findByEvent(event: { id: string, version: number }): Promise<ITicketSchema | null>
};

const ticketSchema = new mongoose.Schema<ITicketSchema>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  version: {
    type: Number,
    // required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.methods.isReserved = async function (this: HydratedDocument<ITicketSchema>): Promise<boolean> {
  const existingOrder = await global.DBModels.ORDER.findOne({
    ticket: this?._id,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete
      ]
    }
  });

  return Boolean(existingOrder?._id);
};

ticketSchema.statics.findByEvent = async function(event: { id: string, version: number }): Promise<ITicketSchema | null> {
  const fetchedTicket = await global.DBModels.TICKET?.findOne({
    _id: new mongoose.Types.ObjectId(event?.id?.toString?.()),
    version: event?.version - 1
  });
  return fetchedTicket;
}

const TicketModel = mongoose.model<ITicketSchema, ITicketModel>("Ticket", ticketSchema);

export default TicketModel;
export {
  ITicketSchema,
  ITicketModel
};