import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/auth/authTypes";

const verifyJWTTokenHandler = ({
	token
} : {
	token: string
}) => {
	const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
	return payload;
};

export {
	verifyJWTTokenHandler
};