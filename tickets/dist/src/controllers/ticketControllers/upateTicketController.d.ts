import { RequestHandler } from "express";
import { ITicketUpdateRequestParams, ITicketUpdateRequestBody } from "../../types/requestTypes/tickets";
declare const updateTicketController: {
    validation: RequestHandler<ITicketUpdateRequestParams, any, ITicketUpdateRequestBody>;
    handler: RequestHandler<ITicketUpdateRequestParams, any, ITicketUpdateRequestBody>;
};
export default updateTicketController;
