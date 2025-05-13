import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose, { HydratedDocument } from "mongoose";
import { z } from "zod";
import createOrderSchema from "../../validationSchemas/orderValidationSchemas/createOrderSchema";
import { IOrderCreationRequestBody } from "../../types/requestTypes/orders";
import { BadRequestError, OrderStatus, RequestValidationError, } from "@himanshusarmaorg/common";
import { GeneralError, NotFoundError } from "@himanshusarmaorg/common";
// import { TicketCreatedPublisher } from "../../events/publishers/ticketCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const fetchOrdersController = {
  validation: (async (
    req: Request, 
    res: Response, next: NextFunction
  ) => {
    try {
      next();
    } catch (err) {
      console.log(err, "validationError");
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler,  
  handler: (async (req: Request, res: Response, next: NextFunction) => {
    const fetchedOrders = await global.DBModels.ORDER.find(
      {
        userId: new mongoose.Types.ObjectId(req?.user?._id?.toString())
      }
    )
      .populate("ticket");

    if (!fetchedOrders) {
      throw new NotFoundError("No orders were found");
    }

    res.status(200).send(fetchedOrders);
    // new TicketCreatedPublisher(natsWrapper?.client).publish(
    //   {
    //     id: newTicket?._id?.toString() || "",
    //     title: newTicket?.title,
    //     price: newTicket?.price,
    //     userId: newTicket?.userId?.toString(),
    //   }
    // );
  }) as RequestHandler
};

export default fetchOrdersController;