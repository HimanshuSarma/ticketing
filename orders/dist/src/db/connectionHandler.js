"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TicketModel_1 = __importDefault(require("../models/TicketModel"));
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const createConnectionHandler = async () => {
    try {
        if (!process.env?.DB_URI) {
            process.exit(0);
        }
        else {
            await mongoose_1.default.connect(process.env?.DB_URI || "");
            console.log("Db connected");
            const dbModels = {
                TICKET: TicketModel_1.default,
                ORDER: OrderModel_1.default
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
    }
    catch (err) {
        console.error(err, "DB connection error!");
    }
};
exports.default = createConnectionHandler;
