import { RequestHandler } from "express";
import { IUserSignupRequestBody } from "../../types/requestTypes/users";
declare const userSigninController: {
    validation: RequestHandler<any, any, IUserSignupRequestBody>;
    handler: RequestHandler<any, any, IUserSignupRequestBody>;
};
export default userSigninController;
