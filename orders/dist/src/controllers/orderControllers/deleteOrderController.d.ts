import { RequestHandler } from "express";
import { IOrderDeleteRequestQueryParams } from "../../types/requestTypes/orders";
declare const deleteOrderController: {
    validation: RequestHandler<any, any, any, IOrderDeleteRequestQueryParams>;
    handler: RequestHandler<any, any, any, IOrderDeleteRequestQueryParams>;
};
export default deleteOrderController;
