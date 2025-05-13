import { RequestHandler } from "express";
import { IOrderCreationRequestBody } from "../../types/requestTypes/orders";
declare const createOrderController: {
    validation: RequestHandler<any, any, IOrderCreationRequestBody>;
    handler: RequestHandler<any, any, IOrderCreationRequestBody>;
};
export default createOrderController;
