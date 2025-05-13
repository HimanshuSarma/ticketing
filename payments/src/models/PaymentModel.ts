import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface IPaymentSchema extends mongoose.Document {
  orderId: string,
  paymentId: string,
  version: number
};

interface IPaymentModel extends mongoose.Model<IPaymentSchema> {
};

const paymentSchema = new mongoose.Schema<IPaymentSchema>({
  orderId: {
    type: String,
    required: true
  },
  paymentId: {
    type: String,
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

paymentSchema.set("versionKey", "version");
paymentSchema.plugin(updateIfCurrentPlugin);

const PaymentModel = mongoose.model<IPaymentSchema, IPaymentModel>(
  "payments", 
  paymentSchema
);

export default PaymentModel;
export {
  IPaymentSchema,
  IPaymentModel
};