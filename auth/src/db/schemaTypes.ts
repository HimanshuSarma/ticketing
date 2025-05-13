import { Model } from "mongoose";
import { IUserModel, IUserSchema } from "../models/UserModel";

interface IDBModels {
  USER: IUserModel
};

export type {
  IDBModels
};