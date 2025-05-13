"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
;
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});
// ✅ Move comparePassword to an instance method
userSchema.methods.comparePassword = function (password) {
    console.log(this, password, "comparePassword"); // 'this' now refers to the document
    return (this.password === password); // Replace with actual password comparison logic
};
const UserModel = mongoose_1.default.model("users", userSchema);
exports.default = UserModel;
