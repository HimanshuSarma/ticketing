import { UserRole } from "../../staticData/userRoles";

interface JWTPayload {
	userType?: UserRole,
  id: string,
  email: string
};

export type {
	JWTPayload
};