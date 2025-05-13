import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose, { HydratedDocument } from "mongoose";
import { z } from "zod";
import createOrderSchema from "../../validationSchemas/orderValidationSchemas/createOrderSchema";
import { IOrderCreationRequestBody } from "../../types/requestTypes/orders";
import { BadRequestError, OrderStatus, RequestValidationError, } from "@himanshusarmaorg/common";
import { GeneralError, NotFoundError } from "@himanshusarmaorg/common";
import { OrderCreatedPublisher } from "../../events/publishers/orderCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const createOrderController = {
  validation: (async (
    req: Request<any, any, IOrderCreationRequestBody>, 
    res: Response, next: NextFunction
  ) => {
    try {
      console.log(req?.user, req?.body, "createOrderControllerValidation")
      const parsedBody = createOrderSchema.parse({
        ...req.body,
        // userId: req?.user?._id
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
  }) as RequestHandler<any, any, IOrderCreationRequestBody>,  
  handler: (async (req: Request<any, any, IOrderCreationRequestBody>, res: Response, next: NextFunction) => {
    const fetchedTicket = await global.DBModels.TICKET.findOne(
      {
        _id: new mongoose.Types.ObjectId(req?.body?.ticketId?.toString())
      }
    );

    if (!fetchedTicket?._id) {
      throw new NotFoundError("The request ticket was not found");
    }

    const isReserved = await fetchedTicket?.isReserved(); 

    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved!");
    }

    // Build the order and save it to db...
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);


    const newOrder = new global.DBModels.ORDER({
      userId: new mongoose.Types.ObjectId(req?.user?._id),
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: fetchedTicket?._id
    });

    await newOrder.save();

    res.status(200).send(newOrder);
    new OrderCreatedPublisher(natsWrapper?.client).publish(
      {
        version: newOrder?.version,
        status: newOrder?.status,
        id: newOrder?._id?.toString() || "",
        userId: newOrder?.userId?.toString(),
        expiresAt: newOrder?.expiresAt?.toISOString(),
        ticket: {
          id: newOrder?.ticket?._id?.toString() || "",
          price: newOrder?.ticket?.price
        }
      }
    );
  }) as RequestHandler<any, any, IOrderCreationRequestBody>
};

export default createOrderController;