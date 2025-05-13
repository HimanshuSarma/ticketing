import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { IUserSignupRequestBody } from "../../types/requestTypes/users";
import { RequestValidationError } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";

const userSignoutController = {
  validation: (async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    try {
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler,  
  handler: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session = null;
      res.status(200).json({});
    } catch (err) {
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler
};

export default userSignoutController;