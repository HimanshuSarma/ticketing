import mongoose, { Connection, Model, Mongoose } from "mongoose";
import { IDBModels } from "./schemaTypes";
import UserModel, { IUserModel, IUserSchema } from "../models/UserModel";


const createConnectionHandler = async () => {
  try {
    await mongoose.connect(`mongodb://172.18.255.201:27017/auth`);
    console.log("Db connected");
    const dbModels: IDBModels = {
      USER: UserModel
    };

    global.DBModels = dbModels;

    // conn.on("connected", () => {
    //   console.log("Db connected");
    //   const dbModels: IDBModels = {
    //     USER: UserModel
    //   };

    //   global.DBModels = dbModels;
    // });

    // conn.on("error", () => {
    //   console.log("Some error occured in connecting to the DB. Exiting");
    //   process.exit(0);
    // });
  } catch (err: any) {
    console.error(err, "DB connection error!");
  }
};

export default createConnectionHandler;