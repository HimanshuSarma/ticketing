import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import signupSchema from "../../validationSchemas/userValidationSchemas/signupSchema";
import { IUserSignupRequestBody } from "../../types/requestTypes/users";
import { RequestValidationError } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
import { BadRequestError } from "@himanshusarmaorg/common";

const userSigninController = {
  validation: (async (
    req: Request<any, any, IUserSignupRequestBody>, 
    res: Response, next: NextFunction
  ) => {
    try {
      const parsedBody = signupSchema.parse(req.body);
      req.body = parsedBody;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Send a 400 Bad Request with validation errors
        throw new RequestValidationError(err);
      }

      throw new GeneralError();
    }
  }) as RequestHandler<any, any, IUserSignupRequestBody>,  
  handler: (async (req: Request<any, any, IUserSignupRequestBody>, res: Response, next: NextFunction) => {
    try {
      const user = await global.DBModels.USER.findOne({
        email: req?.body?.email
      });
  
      if (!user?._id) {
        throw new BadRequestError("User doesn't exist!");
      }

      if (user?.comparePassword(req?.body?.password)) {
        throw new BadRequestError("Password is incorrect!");
      }  

      const userJwt = jwt.sign({
        _id: user?._id,
        email: user?.email
      }, process.env.JWT_KEY as string);

      // if (req?.session) {
      //   req.session.jwt = userJwt;
      // }
      
      res.status(200).json({
        user,
        token: userJwt
      });
    } catch (err) {
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler<any, any, IUserSignupRequestBody>
};

export default userSigninController;