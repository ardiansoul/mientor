import { eq } from "drizzle-orm";
import { users } from "../../drizzle/schemas/users";
import { db } from "../config/database-config";
import { verifyToken } from "../helpers/generate";
import { roles } from "../../drizzle/schemas/roles";
import { UserDto } from "../dto/user-dto";

export default class UserService {
  static async getUser(id: string) {
    const [userExist] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return userExist;
  }
  static async getUsers() {
    const userExists = await db
      .select({
        id: users.id,
        roleId: roles.id,
        email: users.email,
        phone: users.phone,
        provider: users.provider,
        deletedAt: users.deletedAt,
      })
      .from(users)
      .leftJoin(roles, eq(roles.id, users.roleId));
    return userExists;
  }

  static async me(token: string) {
    const { userId } = verifyToken(token);
    const [userExist] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    return userExist;
  }

  static async createUser(data: UserDto) {}
}
