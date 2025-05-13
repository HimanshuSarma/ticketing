import express from 'express';
import { paymentsRouter } from "./payments";

const router = express.Router();

router.use(
  `/api/payments`,
  paymentsRouter
);

export {
  router as paymentsIndexRouter
}