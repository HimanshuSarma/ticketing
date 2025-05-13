import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose, { HydratedDocument, mongo } from "mongoose";
import { z } from "zod";
import createOrderSchema from "../../validationSchemas/orderValidationSchemas/createOrderSchema";
import { IOrderCreationRequestBody, IOrderFetchRequestQueryParams } from "../../types/requestTypes/orders";
import { BadRequestError, OrderStatus, RequestValidationError, } from "@himanshusarmaorg/common";
import { GeneralError, NotFoundError } from "@himanshusarmaorg/common";
// import { TicketCreatedPublisher } from "../../events/publishers/ticketCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";
import fetchOrderByIdSchema from "../../validationSchemas/orderValidationSchemas/fetchOrderByIdSchema";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const fetchOrderByIdController = {
  validation: (async (
    req: Request<any, any, any, IOrderFetchRequestQueryParams>, 
    res: Response, next: NextFunction
  ) => {
    try {
      console.log(req?.user, req?.body, "createOrderControllerValidation")
      const parsedQueryParams = fetchOrderByIdSchema.parse({
        ...req.query,
        // userId: req?.user?._id
      });
      req.query = parsedQueryParams;
      next();
    } catch (err) {
      console.log(err, "validationError");
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler<any, any, any, IOrderFetchRequestQueryParams>,  
  handler: (async (req: Request<any, any, any, IOrderFetchRequestQueryParams>, res: Response, next: NextFunction) => {
    const fetchedOrder = await global.DBModels.ORDER.findOne(
      {
        _id: new mongoose.Types.ObjectId(req?.query?.orderId),
        userId: new mongoose.Types.ObjectId(req?.user?._id)
      }
    )
      .populate("ticket");

    if (!fetchedOrder?._id) {
      throw new NotFoundError("No order was found");
    }

    res.status(200).send(fetchedOrder);
    // new TicketCreatedPublisher(natsWrapper?.client).publish(
    //   {
    //     id: newTicket?._id?.toString() || "",
    //     title: newTicket?.title,
    //     price: newTicket?.price,
    //     userId: newTicket?.userId?.toString(),
    //   }
    // );
  }) as RequestHandler<any, any, any, IOrderFetchRequestQueryParams>
};

export default fetchOrderByIdController;