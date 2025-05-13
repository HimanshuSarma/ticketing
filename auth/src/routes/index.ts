import express from 'express';
import { userRouter } from "./users";

const router = express.Router();

router.use(
  `/api/users`,
  userRouter
);

export {
  router as userIndexRouter
}