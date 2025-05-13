import express from 'express';
import createPaymentController from '../controllers/paymentControllers/createPaymentController';
import { checkAuthenticationMiddleware } from "@himanshusarmaorg/common";
import { IPaymentCreationRequestBody } from '../types/requestTypes/payments';

const router = express.Router();

router.post<
  any,
  any,
  IPaymentCreationRequestBody
>(  
  `/`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  createPaymentController.validation,
  createPaymentController.handler
);

export {
  router as paymentsRouter
};