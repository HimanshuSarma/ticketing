import { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose, { HydratedDocument, mongo } from "mongoose";
import { z } from "zod";
import createOrderSchema from "../../validationSchemas/orderValidationSchemas/createOrderSchema";
import { IOrderCreationRequestBody, IOrderDeleteRequestQueryParams } from "../../types/requestTypes/orders";
import { BadRequestError, OrderStatus, RequestValidationError, } from "@himanshusarmaorg/common";
import { GeneralError, NotFoundError } from "@himanshusarmaorg/common";
import { OrderCancelledPublisher } from "../../events/publishers/orderCancelledPublisher";
import { natsWrapper } from "../../natsWrapper";
import deleteOrderSchema from "../../validationSchemas/orderValidationSchemas/deleteOrderSchema";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const deleteOrderController = {
  validation: (async (
    req: Request<any, any, any, IOrderDeleteRequestQueryParams>, 
    res: Response, next: NextFunction
  ) => {
    try {
      console.log(req?.user, req?.query, "deleteOrderControllerValidation")
      const parsedQueryParams = deleteOrderSchema.parse({
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
  }) as RequestHandler<any, any, any, IOrderDeleteRequestQueryParams>,  
  handler: (async (req: Request<any, any, any, IOrderDeleteRequestQueryParams>, res: Response, next: NextFunction) => {
    const cancelledOrder = await global.DBModels.ORDER.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(req?.query?.orderId),
        userId: new mongoose.Types.ObjectId(req?.user?._id)
      },
      {
        status: OrderStatus.Cancelled
      },
      {
        new: true
      }
    ).populate("ticket");

    if (!cancelledOrder?._id) {
      throw new NotFoundError("No order was found");
    }

    res.status(200).send(cancelledOrder);
    
    new OrderCancelledPublisher(natsWrapper?.client).publish(
      {
        id: cancelledOrder?._id?.toString() || "",
        ticket: {
          id: cancelledOrder?.ticket?._id?.toString?.() || "",
          
        },
        version: cancelledOrder?.version
      }
    );
  }) as RequestHandler<any, any, any, IOrderDeleteRequestQueryParams>
};

export default deleteOrderController;