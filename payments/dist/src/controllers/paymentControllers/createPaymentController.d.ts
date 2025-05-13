import { RequestHandler } from "express";
import { IPaymentCreationRequestBody } from "../../types/requestTypes/payments";
declare const createPaymentController: {
    validation: RequestHandler<any, any, IPaymentCreationRequestBody>;
    handler: RequestHandler<any, any, IPaymentCreationRequestBody>;
};
export default createPaymentController;
