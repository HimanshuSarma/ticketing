import { RequestHandler } from "express";
import { ITicketCreationRequestBody } from "../../types/requestTypes/tickets";
declare const createTicketController: {
    validation: RequestHandler<any, any, ITicketCreationRequestBody>;
    handler: RequestHandler<any, any, ITicketCreationRequestBody>;
};
export default createTicketController;
