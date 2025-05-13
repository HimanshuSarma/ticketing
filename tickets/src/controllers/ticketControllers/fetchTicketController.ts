import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import fetchTicketSchema from "../../validationSchemas/ticketValidationSchemas/fetchTicketSchema";
import { ITicketFetchRequestParams } from "../../types/requestTypes/tickets";
import { RequestValidationError } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
import mongoose, { mongo } from "mongoose";

const fetchTicketController = {
  validation: (async (
    req: Request<ITicketFetchRequestParams>, 
    res: Response, next: NextFunction
  ) => {
    try {
      const parsedParams = fetchTicketSchema.parse(req.params);
      req.params = parsedParams;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler<ITicketFetchRequestParams>,  
  handler: (async (req: Request<ITicketFetchRequestParams>, res: Response, next: NextFunction) => {
    try {
      const fetchedTicket = await global.DBModels.TICKET.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
        userId: new mongoose.Types.ObjectId(req.params?.userId)
      });
      res.status(200).send(fetchedTicket);
    } catch (err) {
      console.log(err, "handlerError")
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler<ITicketFetchRequestParams>
};

export default fetchTicketController;