import mongoose, { Connection, Model, Mongoose } from "mongoose";
import { IDBModels } from "./schemaTypes";
import TicketModel from "../models/TicketModel";


const createConnectionHandler = async () => {
  try {
    if (!process.env?.DB_URI) {
      process.exit(0);
    } else {
      await mongoose.connect(process.env?.DB_URI || "");
      console.log("Db connected");
      const dbModels: IDBModels = {
        TICKET: TicketModel
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
    }
  } catch (err: any) {
    console.error(err, "DB connection error!");
  }
};

export default createConnectionHandler;