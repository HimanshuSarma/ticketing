import { Request, Response, NextFunction } from "express";
import { extractJWTTokenPayloadHandler } from "../utils/extractJWTTokenPayloadHandler";
import { JWTPayload } from "../types/auth/authTypes";

const checkAuthenticationMiddleware = () => {
  return (req: Request, res: Response<{ errorMessage: string }>, next: NextFunction) => {

    const jwtTokenPayload: JWTPayload = extractJWTTokenPayloadHandler(req);

    if (jwtTokenPayload) {
      req.user = jwtTokenPayload;
      next();
    } else {
      res.status(500)?.json({
        errorMessage: "JWT malformed!"
      });
    }

    // if (roles?.includes?.(jwtTokenPayload?.userType)) {
    // 	if (jwtTokenPayload?.userType === userRoles.player) {
    // 		if ("isBlocked" in jwtTokenPayload) {
    // 			if (jwtTokenPayload?.isBlocked) {
    // 				res?.status(400)?.json({
    // 					errorMessage: responseMessages?.YOU_ARE_BLOCKED
    // 				});
    // 			} else {
    // 				req.user = jwtTokenPayload;
    // 				next();
    // 			}
    // 		} else {
    // 			req.user = jwtTokenPayload;
    // 			next();
    // 		}
    // 	} else {
    // 		req.user = jwtTokenPayload;
    // 		next();
    // 	}
    // } else {
    // 	res?.status(400)?.json({
    // 		errorMessage: responseMessages?.NO_PERMISSION
    // 	});
    // }
  }
};

export {
  checkAuthenticationMiddleware
};