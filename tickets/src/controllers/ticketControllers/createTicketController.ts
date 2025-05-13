import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import createTicketSchema from "../../validationSchemas/ticketValidationSchemas/createTicketSchema";
import { ITicketCreationRequestBody } from "../../types/requestTypes/tickets";
import { RequestValidationError, Subjects } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
import { TicketCreatedPublisher } from "../../events/publishers/ticketCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";

const createTicketController = {
  validation: (async (
    req: Request<any, any, ITicketCreationRequestBody>, 
    res: Response, next: NextFunction
  ) => {
    try {
      console.log(req?.user, req?.body, "createTicketControllerValidation")
      const parsedBody = createTicketSchema.parse({
        ...req.body,
        userId: req?.user?._id
      });
      req.body = parsedBody;
      next();
    } catch (err) {
      console.log(err, "validationError");
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler<any, any, ITicketCreationRequestBody>,  
  handler: (async (req: Request<any, any, ITicketCreationRequestBody>, res: Response, next: NextFunction) => {
    try {
      
      const newTicket = new global.DBModels.TICKET(
        {
          ...req?.body,
          userId: req?.user?._id
        }
      );

      await newTicket?.save();
      res.status(200).send(newTicket);

      console.log(`ticket-srv`, newTicket);

      new TicketCreatedPublisher(natsWrapper?.client).publish(
        {
          id: newTicket?._id?.toString() || "",
          title: newTicket?.title,
          price: newTicket?.price,
          userId: newTicket?.userId?.toString(),
          version: newTicket?.version
        }
      );
    } catch (err) {
      console.log(err, "handlerError")
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler<any, any, ITicketCreationRequestBody>
};

export default createTicketController;