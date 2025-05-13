import express from 'express';
import { ticketsRouter } from "./tickets";

const router = express.Router();

router.use(
  `/api/tickets`,
  ticketsRouter
);

export {
  router as ticketsIndexRouter
}