import { Request } from "express";
import { verifyJWTTokenHandler } from "../utils/verifyJWTTokenHandler";

const extractJWTTokenPayloadHandler = (req: Request) => {
  if (typeof req === 'string') {
    // If req is string, then, it means 'req' argument is the token itself,
    // and not the express Request object...

    // 'payload' will either be null or a valid value
    const payload = verifyJWTTokenHandler({
      token: req
    });

    return payload;
  } else {

    const token = req?.headers?.authorization as string;

    // 'payload' will either be null or a valid value
    const payload = verifyJWTTokenHandler({
      token
    });

    return payload;
  }
};

export {
  extractJWTTokenPayloadHandler
};