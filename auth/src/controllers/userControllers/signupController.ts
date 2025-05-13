import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import signupSchema from "../../validationSchemas/userValidationSchemas/signupSchema";
import { IUserSignupRequestBody } from "../../types/requestTypes/users";
import { RequestValidationError } from "@himanshusarmaorg/common";
import { GeneralError } from "@himanshusarmaorg/common";
import { BadRequestError } from "@himanshusarmaorg/common";

const userSignupController = {
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
      const doesUserExist = await global.DBModels.USER.findOne({
        email: req?.body?.email
      });

      if (doesUserExist?._id) {
        throw new BadRequestError("User already exists!");
      }

      console.log("JWT_KEY", process.env.JWT_KEY);

      const newUser = await global.DBModels.USER.create(req?.body);
      const userJwt = jwt.sign({
        _id: newUser?._id,
        email: newUser?.email
      }, process.env.JWT_KEY as string);

      // if (req?.session) {
      //   req.session.jwt = userJwt;
      // }
      res.status(200).json({
        user: newUser,
        token: userJwt
      });
    } catch (err) {
      console.log(err, "userSignupControllerHandler");
      const error: Error = err as Error;
      throw new GeneralError(error?.message);
    }
    
  }) as RequestHandler<any, any, IUserSignupRequestBody>
};

export default userSignupController;