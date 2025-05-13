import mongoose, { HydratedDocument } from "mongoose";

interface IUserSchema extends mongoose.Document {
  email: string,
  password: string,
  comparePassword(password: string): boolean; // ✅ Instance method instead of static
};

interface IUserModel extends mongoose.Model<IUserSchema> {
  comparePassword(password: string): boolean
};

const userSchema = new mongoose.Schema<IUserSchema>({
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
userSchema.methods.comparePassword = function (password: string): boolean {
  console.log(this, password, "comparePassword"); // 'this' now refers to the document
  return (this.password === password); // Replace with actual password comparison logic
};

const UserModel = mongoose.model<IUserSchema, IUserModel>("users", userSchema);

export default UserModel;
export {
  IUserSchema,
  IUserModel
};