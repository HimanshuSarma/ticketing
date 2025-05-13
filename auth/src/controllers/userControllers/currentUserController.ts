import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import signupSchema from "../../validationSchemas/userValidationSchemas/signupSchema";
import { IUserSignupRequestBody } from "../../types/requestTypes/users";
import { GeneralError } from "@himanshusarmaorg/common";
import { BadRequestError } from "@himanshusarmaorg/common";

const currentUserController = {
  validation: (async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    if (req?.session?.jwt) {
      next();
    } else {
      throw new BadRequestError("No token found");
    }
  }) as RequestHandler<any, any, any>,  
  handler: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userJwtPayload = jwt.verify(req?.session?.jwt, process.env.JWT_KEY as string);
      res.status(200).json({
        currentUser: userJwtPayload
      });
    } catch (err) {
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler<any, any, any>
};

export default currentUserController;