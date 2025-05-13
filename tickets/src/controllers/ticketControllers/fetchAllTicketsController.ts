import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import fetchTicketSchema from "../../validationSchemas/ticketValidationSchemas/fetchTicketSchema";
import { ITicketFetchRequestParams } from "../../types/requestTypes/tickets";
import { RequestValidationError } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
import mongoose from "mongoose";

const fetchAllTicketsController = {
  validation: (async (
    req: Request, 
    res: Response, next: NextFunction
  ) => {
    try {
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler,  
  handler: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fetchedTickets = await global.DBModels.TICKET.find({});
      res.status(200).send(fetchedTickets);
    } catch (err) {
      console.log(err, "handlerError")
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler
};

export default fetchAllTicketsController;