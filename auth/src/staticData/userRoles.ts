// type superadmin = "Superadmin";
// type admin = "Admin";
// type customer = "customer";
// type delivery_partner = "delivery_partner";
type Player = "Player";

interface IUserRoles {
	player: Player;
};

const userRoles: IUserRoles = {
	player: "Player"
};

type UserRole = Player;

export type {
	IUserRoles,
	UserRole
};
export {
	userRoles
};