import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@himanshusarmaorg/common";

interface IOrderSchema extends mongoose.Document {
  status: OrderStatus,
  userId: mongoose.Schema.Types.ObjectId,
  price: number,
  version: number,
};

interface IOrderModel extends mongoose.Model<IOrderSchema> {
  findByEvent(event: { id: string, version: number }): Promise<IOrderSchema | null>
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
  price: {
    type: mongoose.Schema.Types.Number,
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

orderSchema.statics.findByEvent = async function(event: { id: string, version: number }): Promise<IOrderSchema | null> {
  const fetchedOrder = await global.DBModels.ORDER?.findOne({
    _id: new mongoose.Types.ObjectId(event?.id?.toString?.()),
    version: event?.version - 1
  });
  return fetchedOrder;
}

const OrderModel = mongoose.model<IOrderSchema, IOrderModel>("orders", orderSchema);

export default OrderModel;
export {
  IOrderSchema,
  IOrderModel
};