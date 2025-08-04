import { and, eq, gt, InferInsertModel, isNull, or } from "drizzle-orm";
import { users } from "../../drizzle/schemas/users";
import { db } from "../config/database-config";
import { generateId, verifyToken } from "../helpers/generate";
import { roles } from "../../drizzle/schemas/roles";
import { UserDto } from "../dto/user-dto";
import { AuthError, ConflictError } from "../config/error-config";
import { profiles } from "../../drizzle/schemas/profiles";
import { sessions } from "../../drizzle/schemas/sessions";

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
      .leftJoin(roles, eq(roles.id, users.roleId))
      .where(and(isNull(users.deletedAt)));
    return userExists;
  }

  static async me(refresh_token: string, access_token: string) {
    console.log(refresh_token, access_token, "asd");
    const { id, userId } = verifyToken(access_token);

    const [profileExist] = await db
      .select({
        id: profiles.id,
        userId: profiles.userId,
        email: users.email,
        phone: users.phone,
        firstName: profiles.firstName,
        lastName: profiles.lastName,
        avatarUrl: profiles.avatarUrl,
        deleteAt: profiles.deletedAt,
      })
      .from(profiles)
      .innerJoin(users, eq(profiles.userId, users.id))
      .where(and(eq(profiles.id, id), eq(profiles.userId, userId)))
      .limit(1);

    if (!profileExist) throw new AuthError("User not found");

    const [session] = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          gt(sessions.expiresAt, new Date()),
          eq(sessions.refreshToken, refresh_token)
        )
      )
      .limit(1);

    if (!session) throw new AuthError("Session expired");

    return profileExist;
  }

  static async createUser(data: UserDto) {
    const [userExist] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, data.email),
          data.phone ? eq(users.phone, data.phone) : undefined
        )
      )
      .limit(1);

    console.log(userExist, "user exist");
    if (userExist) throw new ConflictError("Email already created");

    db.transaction(async (trx) => {
      const userId = generateId();
      const user: InferInsertModel<typeof users> = {
        email: data.email,
        id: userId,
        phone: data.phone || null,
        provider: "local",
      };

      const profile: InferInsertModel<typeof profiles> = {
        userId: userId,
        avatarUrl: data.avatarUrl,
        firstName: data.firstName,
        lastName: data.lastName,
      };
      await trx.insert(users).values(user);
      await trx.insert(profiles).values(profile);

      return null;
    });
  }

  static async updateUser(id: string, data: UserDto) {
    const [userExist] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!userExist) throw new ConflictError("User not found");

    const user: InferInsertModel<typeof users> = {
      email: data.email,
      phone: data.phone || null,
    };

    const profile: InferInsertModel<typeof profiles> = {
      userId: userExist.id,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
    };

    await db.transaction(async (trx) => {
      await trx.update(users).set(user).where(eq(users.id, id));
      await trx.update(profiles).set(profile).where(eq(profiles.userId, id));
    });

    return null;
  }

  static async deleteUser(id: string) {
    const [userExist] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!userExist) throw new ConflictError("User not found");

    await db.transaction(async (trx) => {
      await trx
        .update(users)
        .set({ deletedAt: new Date() })
        .where(eq(users.id, id));
    });

    return null;
  }
}
