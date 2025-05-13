import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@himanshusarmaorg/common";
import { ITicketSchema } from "./TicketModel";

interface IOrderSchema extends mongoose.Document {
  status: OrderStatus,
  userId: mongoose.Schema.Types.ObjectId,
  ticket: ITicketSchema,
  version: number,
  expiresAt: Date
};

interface IOrderModel extends mongoose.Model<IOrderSchema> {
};

const orderSchema = new mongoose.Schema<IOrderSchema>({
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
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
      delete ret.__v;
    }
  }
});

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

// ✅ Move comparePassword to an instance method
// orderSchema.methods.comparePassword = function (status: string): boolean {
//   console.log(this, status, "comparePassword"); // 'this' now refers to the document
//   return (this.status === status); // Replace with actual status comparison logic
// };

const OrderModel = mongoose.model<IOrderSchema, IOrderModel>("orders", orderSchema);

export default OrderModel;
export {
  IOrderSchema,
  IOrderModel
};