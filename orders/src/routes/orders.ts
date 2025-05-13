import express from 'express';
import { IOrderCreationRequestBody, IOrderDeleteRequestQueryParams, IOrderFetchRequestQueryParams } from '../types/requestTypes/orders';
import { checkAuthenticationMiddleware } from '@himanshusarmaorg/common';
import createOrderController from '../controllers/orderControllers/createOrderController';
import fetchOrdersController from '../controllers/orderControllers/fetchOrdersController';
import deleteOrderController from '../controllers/orderControllers/deleteOrderController';

const router = express.Router();

router.post<
  any,
  any,
  IOrderCreationRequestBody
>(  
  `/`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  createOrderController.validation,
  createOrderController.handler
);

router.patch<
  any,
  any,
  any,
  IOrderDeleteRequestQueryParams
>(  
  `/`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  deleteOrderController.validation,
  deleteOrderController.handler
);

// router.get<
//   ITicketFetchRequestParams
// >(  
//   `/:id/:userId`,
//   fetchTicketController.validation,
//   fetchTicketController.handler
// );

router.get(  
  `/`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  fetchOrdersController.validation,
  fetchOrdersController.handler
);


router.get<
  any,
  any,
  any,
  IOrderFetchRequestQueryParams
>(  
  `/`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  fetchOrdersController.validation,
  fetchOrdersController.handler
);

// router.post<
//   any,
//   any,
//   ITicketCreationRequestBody
// >(
//   `/signin`,
//   userSigninController.validation,
//   userSigninController.handler
// );

// router.post(
//   `/signout`,
//   userSignoutController.validation,
//   userSignoutController.handler
// );

// router.get(
//   `/currentuser`, 
//   currentUserController.validation,
//   currentUserController.handler
// );

export {
  router as ordersRouter
};