import express from 'express';
import { ITicketCreationRequestBody, ITicketUpdateRequestBody, ITicketFetchRequestParams, ITicketUpdateRequestParams } from '../types/requestTypes/tickets';
import createTicketController from '../controllers/ticketControllers/createTicketController';
import fetchTicketController from '../controllers/ticketControllers/fetchTicketController';
import fetchAllTicketsController from '../controllers/ticketControllers/fetchAllTicketsController';
import { checkAuthenticationMiddleware } from "@himanshusarmaorg/common";
import updateTicketController from '../controllers/ticketControllers/upateTicketController';

const router = express.Router();

router.post<
  any,
  any,
  ITicketCreationRequestBody
>(  
  `/`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  createTicketController.validation,
  createTicketController.handler
);

router.put<
  ITicketUpdateRequestParams,
  any,
  ITicketUpdateRequestBody
>(  
  `/:id`,
  checkAuthenticationMiddleware(process.env?.JWT_KEY || "abcd"),
  updateTicketController.validation,
  updateTicketController.handler
);

router.get<
  ITicketFetchRequestParams
>(  
  `/:id/:userId`,
  fetchTicketController.validation,
  fetchTicketController.handler
);

router.get(  
  `/`,
  fetchAllTicketsController.validation,
  fetchAllTicketsController.handler
);

export {
  router as ticketsRouter
};