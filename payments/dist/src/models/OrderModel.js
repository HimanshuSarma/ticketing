"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
const common_1 = require("@himanshusarmaorg/common");
;
;
const orderSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
        required: true,
        enum: Object.values(common_1.OrderStatus),
        default: common_1.OrderStatus.Created
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    price: {
        type: mongoose_1.default.Schema.Types.Number,
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
orderSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
// ✅ Move comparePassword to an instance method
// orderSchema.methods.comparePassword = function (status: string): boolean {
//   console.log(this, status, "comparePassword"); // 'this' now refers to the document
//   return (this.status === status); // Replace with actual status comparison logic
// };
orderSchema.statics.findByEvent = async function (event) {
    const fetchedOrder = await global.DBModels.ORDER?.findOne({
        _id: new mongoose_1.default.Types.ObjectId(event?.id?.toString?.()),
        version: event?.version - 1
    });
    return fetchedOrder;
};
const OrderModel = mongoose_1.default.model("orders", orderSchema);
exports.default = OrderModel;
