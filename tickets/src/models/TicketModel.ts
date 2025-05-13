import mongoose, { HydratedDocument } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ITicketSchema extends mongoose.Document {
  title: string,
  price: number,
  userId: mongoose.Schema.Types.ObjectId,
  orderId?: mongoose.Schema.Types.ObjectId,
  version: number,
};

interface ITicketModel extends mongoose.Model<ITicketSchema> {
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
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
      delete ret.__v;
    }
  }
});

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin)

// ✅ Move comparePassword to an instance method
// ticketSchema.methods.comparePassword = function (price: string): boolean {
//   console.log(this, price, "comparePassword"); // 'this' now refers to the document
//   return (this.price === price); // Replace with actual price comparison logic
// };

const TicketModel = mongoose.model<ITicketSchema, ITicketModel>("tickets", ticketSchema);

export default TicketModel;
export {
  ITicketSchema,
  ITicketModel
};