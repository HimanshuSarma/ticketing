import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import updateTicketSchema, { updateTicketParamsSchema } from "../../validationSchemas/ticketValidationSchemas/updateTicketSchema";
import { ITicketUpdateRequestParams, ITicketUpdateRequestBody } from "../../types/requestTypes/tickets";
import { BadRequestError, NotFoundError, RequestValidationError } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
import mongoose, { mongo } from "mongoose";
import { TicketUpdatedPublisher } from "../../events/publishers/ticketUpdatedPublisher";
import { natsWrapper } from "../../natsWrapper";

const updateTicketController = {
  validation: (async (
    req: Request<ITicketUpdateRequestParams, any, ITicketUpdateRequestBody>, 
    res: Response, next: NextFunction
  ) => {
    try {
      const parsedBody = updateTicketSchema.parse(req.body);
      const parsedParams = updateTicketParamsSchema.parse(req.params);
      req.body = parsedBody;
      req.params = parsedParams;
      next();
    } catch (err) {
      console.log(err, "updateTicketControllerValidation")
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler<ITicketUpdateRequestParams, any, ITicketUpdateRequestBody>,  
  handler: (async (req: Request<ITicketUpdateRequestParams, any, ITicketUpdateRequestBody>, res: Response, next: NextFunction) => {
    let orderId;
    orderId = req?.body?.orderId ? 
      new mongoose.Types.ObjectId(req?.body?.orderId) : 
      null;

    const updatedTicket = await global.DBModels.TICKET.findOne(
      { 
        _id: new mongoose.Types.ObjectId(req.params.id),
        userId: new mongoose.Types.ObjectId(req.user?._id),
      }
    );

    if (!updatedTicket?._id) {
      throw new NotFoundError(
        "Ticket doesn't exist"
      );
    }

    if (updatedTicket?.orderId) {
      if (!("orderId" in req.body) || ("orderId" in req.body && orderId)) {
        throw new BadRequestError(`Ticket is reserved`);
      }
    }

    updatedTicket.set({
      ...req?.body,
      orderId
    })

    await updatedTicket?.save();

    res.status(200).send(updatedTicket);

    new TicketUpdatedPublisher(natsWrapper.client)
      .publish({
        id: updatedTicket?._id?.toString(),
        title: updatedTicket?.title,
        price: updatedTicket?.price,
        orderId: updatedTicket?.orderId?.toString(),
        version: updatedTicket?.version
      }
    )
    
  }) as RequestHandler<ITicketUpdateRequestParams, any, ITicketUpdateRequestBody>
};

export default updateTicketController;