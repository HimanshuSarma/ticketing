import { UserRole } from "../../staticData/userRoles";

interface JWTPayload {
	userType?: UserRole,
  _id: string,
  email: string
};

export type {
	JWTPayload
};