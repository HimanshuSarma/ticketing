"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_update_if_current_1 = require("mongoose-update-if-current");
;
;
const ticketSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
ticketSchema.plugin(mongoose_update_if_current_1.updateIfCurrentPlugin);
// ✅ Move comparePassword to an instance method
// ticketSchema.methods.comparePassword = function (price: string): boolean {
//   console.log(this, price, "comparePassword"); // 'this' now refers to the document
//   return (this.price === price); // Replace with actual price comparison logic
// };
const TicketModel = mongoose_1.default.model("tickets", ticketSchema);
exports.default = TicketModel;
