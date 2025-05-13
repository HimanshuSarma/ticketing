import express from 'express';
import { ordersRouter } from "./orders";

const router = express.Router();

router.use(
  `/api/orders`,
  ordersRouter
);

export {
  router as ordersIndexRouter
}