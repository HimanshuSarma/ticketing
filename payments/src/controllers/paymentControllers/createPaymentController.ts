
import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import createPaymentSchema from "../../validationSchemas/paymentsValidationSchemas/createPaymentSchema";
import { IPaymentCreationRequestBody } from "../../types/requestTypes/payments";
import { BadRequestError, NotFoundError, OrderStatus, RequestValidationError, Subjects } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
// import { TicketCreatedPublisher } from "../../events/publishers/ticketCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";
import mongoose from "mongoose";
import { razorpay } from "../../razorpay";
import { PaymentCreatedPublisher } from "../../events/publishers/paymentCreatedPublisher";


const createPaymentController = {
  validation: (async (
    req: Request<any, any, IPaymentCreationRequestBody>, 
    res: Response, next: NextFunction
  ) => {
    try {
      console.log(req?.user, req?.body, "createTicketControllerValidation")
      const parsedBody = createPaymentSchema.parse({
        ...req.body,
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
  }) as RequestHandler<any, any, IPaymentCreationRequestBody>,  
  handler: (async (req: Request<any, any, IPaymentCreationRequestBody>, res: Response, next: NextFunction) => {
    const fetchedOrder = await global.DBModels.ORDER?.findOne(
      {
        _id: new mongoose.Types.ObjectId(req?.body?.orderId)
      }
    );

    console.log(fetchedOrder, req?.user, "fetchedOrder")

    if (!fetchedOrder?._id) {
      throw new NotFoundError(`The requested order was not found!`);
    }

    if (fetchedOrder?.userId?.toString?.() !== req?.user?.id) {
      throw new BadRequestError(`The requested order doesn't belong to this user!`);
    }

    if (fetchedOrder?.status === OrderStatus.Cancelled) {
      throw new BadRequestError(`The requested order has been cancelled!`);
    }

    const options = {
      // amount should be in the smallest denomination. Here, it should be in paise
      amount: fetchedOrder?.price * 100,
      // amount: 5000,
      currency: 'INR',
      receipt: fetchedOrder?._id?.toString?.() || "",
      payment_capture: 1
    };

    const razorpayRes = await razorpay.orders.create(options);

    // create a payment record...
    // we are not capturing payments in the frontend now
    // so we are directly considering the payment to be complete.
    const newPayment = new global.DBModels.PAYMENT({
      orderId: fetchedOrder?._id,
      paymentId: razorpayRes?.id
    });

    await newPayment.save();

    new PaymentCreatedPublisher(natsWrapper?.client).publish(
      {
        id: newPayment?._id?.toString() || "",
        orderId: newPayment?.orderId?.toString() || "",
        paymentId: newPayment?._id?.toString() || "",
      }
    );

    res.status(200).send({
      fetchedOrder,
      paymentRes: razorpayRes,
      id: newPayment?._id
    });
    
  }) as RequestHandler<any, any, IPaymentCreationRequestBody>
};

export default createPaymentController;