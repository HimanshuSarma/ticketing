import "express"; // Modifies global namespace, so include it!
import { Model } from "mongoose";
import { IDBModels } from "./db/schemaTypes";
import { JWTPayload } from "./types/auth/authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
      token: string,
      UserID: string,
    }
  }

  /* Global variables follow. They *must* use var to work.
      and cannot be initialized here. */
  // eslint-disable-next-line no-var
  var DBModels: IDBModels;
  var signin: (email?: string) => string;
}

export { };