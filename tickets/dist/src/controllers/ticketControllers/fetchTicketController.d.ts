import { RequestHandler } from "express";
import { ITicketFetchRequestParams } from "../../types/requestTypes/tickets";
declare const fetchTicketController: {
    validation: RequestHandler<ITicketFetchRequestParams>;
    handler: RequestHandler<ITicketFetchRequestParams>;
};
export default fetchTicketController;
