import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt"
 
 
interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  roles?: string[];
  id: string;
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}
 
declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends IUser {}
 
  interface Session {
    user?: User;
  }
}
 
declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends IUser {}
}