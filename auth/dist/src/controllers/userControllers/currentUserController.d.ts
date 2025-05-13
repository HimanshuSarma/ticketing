import { RequestHandler } from "express";
declare const currentUserController: {
    validation: RequestHandler<any, any, any>;
    handler: RequestHandler<any, any, any>;
};
export default currentUserController;
