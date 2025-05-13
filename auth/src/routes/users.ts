import express from 'express';
import { IUserSignupRequestBody } from '../types/requestTypes/users';
import userSignupController from '../controllers/userControllers/signupController';
import userSigninController from '../controllers/userControllers/signinController';
import currentUserController from '../controllers/userControllers/currentUserController';
import userSignoutController from '../controllers/userControllers/signoutController';

const router = express.Router();

router.post<
  any,
  any,
  IUserSignupRequestBody
>(  
  `/signup`,
  userSignupController.validation,
  userSignupController.handler
);

router.post<
  any,
  any,
  IUserSignupRequestBody
>(
  `/signin`,
  userSigninController.validation,
  userSigninController.handler
);

router.post(
  `/signout`,
  userSignoutController.validation,
  userSignoutController.handler
);

router.get(
  `/currentuser`, 
  currentUserController.validation,
  currentUserController.handler
);

export {
  router as userRouter
};