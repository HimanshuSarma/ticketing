type Player = "Player";
interface IUserRoles {
    player: Player;
}
declare const userRoles: IUserRoles;
type UserRole = Player;
export type { IUserRoles, UserRole };
export { userRoles };
