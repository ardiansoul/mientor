import { and, eq, gt, InferInsertModel, isNull } from "drizzle-orm";
import { users } from "../../drizzle/schemas/users";
import { db } from "../config/database-config";
import {
  AuthError,
  ConflictError,
  NotFoundError,
} from "../config/error-config";
import { profiles } from "../../drizzle/schemas/profiles";
import {
  generateId,
  generateToken,
  TokenPayload,
  verifyToken,
} from "../helpers/generate";
import { sessions } from "../../drizzle/schemas/sessions";
import { loginDto } from "../dto/login-dto";
import { registerDto } from "../dto/register-dto";
import { googleAuthDto } from "../dto/auth-google-dto";

export const localRegister = async (data: registerDto) => {
  const userExist = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (userExist.length > 0) throw new ConflictError("User already registered");

  return await db.transaction(async (trx) => {
    const userId = generateId();

    const user: InferInsertModel<typeof users> = {
      id: userId,
      provider: data.provider,
      providerId: data.providerId,
      email: data.email,
    };

    const profile: InferInsertModel<typeof profiles> = {
      userId: userId,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl || "",
    };

    await trx.insert(users).values(user);
    await trx.insert(profiles).values(profile);
  });
};

export const login = async (data: loginDto) => {
  const userExist = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (!userExist.length) throw new AuthError("User not authenticated");

  db.transaction(async (trx) => {
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
      .where(eq(profiles.userId, userExist[0].id))
      .limit(1);
    const { deleteAt, ...rest } = profileExist;

    const token: TokenPayload = {
      ...rest,
      isActive: deleteAt === null,
    };

    const { accessToken } = generateToken(token);
    const refreshToken = generateId();
    const session: InferInsertModel<typeof sessions> = {
      userId: userExist[0].id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };

    await trx.insert(sessions).values(session);
    return { accessToken, refreshToken };
  });
};

export const logout = async (token: string) => {
  const sessionExists = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.refreshToken, token), isNull(sessions.deletedAt)));

  if (sessionExists.length) throw new NotFoundError("Session not found");

  await db.update(sessions).set({ deletedAt: new Date() });
};

export const authenticateWithGoogle = async (data: googleAuthDto) => {
  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  return await db.transaction(async (trx) => {
    if (!userExists.length) {
      const userId = generateId();

      const user: InferInsertModel<typeof users> = {
        id: userId,
        provider: data.provider,
        providerId: data.providerId,
        email: data.email,
      };

      const profile: InferInsertModel<typeof profiles> = {
        userId: userId,
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: data.avatarUrl || "",
      };

      await trx.insert(users).values(user);
      await trx.insert(profiles).values(profile);
    }
    if (userExists[0].provider !== "google")
      throw new AuthError("Email registered with another provider");

    const profileExists = await trx
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
      .where(eq(profiles.userId, userExists[0].id));

    const { deleteAt, ...rest } = profileExists[0];

    const token: TokenPayload = {
      ...rest,
      isActive: deleteAt === null,
    };
    const { accessToken } = generateToken(token);
    const refreshToken = generateId();
    const session: InferInsertModel<typeof sessions> = {
      userId: userExists[0].id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    };

    await trx.insert(sessions).values(session);

    return { accessToken, refreshToken };
  });
};

export const me = async (refresh_token: string, access_token: string) => {
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
};
