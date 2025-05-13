import { RequestHandler } from "express";
import { IOrderFetchRequestQueryParams } from "../../types/requestTypes/orders";
declare const fetchOrderByIdController: {
    validation: RequestHandler<any, any, any, IOrderFetchRequestQueryParams>;
    handler: RequestHandler<any, any, any, IOrderFetchRequestQueryParams>;
};
export default fetchOrderByIdController;
