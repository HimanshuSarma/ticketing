"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const createConnectionHandler = async () => {
    try {
        await mongoose_1.default.connect(`mongodb://172.18.255.201:27017/auth`);
        console.log("Db connected");
        const dbModels = {
            USER: UserModel_1.default
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
    catch (err) {
        console.error(err, "DB connection error!");
    }
};
exports.default = createConnectionHandler;
