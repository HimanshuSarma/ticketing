import mongoose from "mongoose";
interface IUserSchema extends mongoose.Document {
    email: string;
    password: string;
    comparePassword(password: string): boolean;
}
interface IUserModel extends mongoose.Model<IUserSchema> {
    comparePassword(password: string): boolean;
}
declare const UserModel: IUserModel;
export default UserModel;
export { IUserSchema, IUserModel };
