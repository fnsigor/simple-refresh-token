import { USERS } from "db";
import { RequestBody, RequestSuccess } from "./schema";
import argon2 from "argon2";
import { TokenFactory } from "@/utils/TokenFactory";

export const useCase = async ({
  email,
  password,
  ip,
}: RequestBody & { ip: string }): Promise<RequestSuccess> => {
  const userExists = USERS.get(email);

  if (!userExists) {
    throw new Error(`Credenciais inválidas`);
  }

  const passwordMatch = await argon2.verify(userExists.password, password);

  if (!passwordMatch) {
    throw new Error(`Credenciais inválidas`);
  }

  const { generateAccessToken, generateRefreshToken } = new TokenFactory(
    userExists.id,
  );

  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken({ ip });

  const response = {
    accessToken,
    refreshToken,
    user: { email: userExists.email, name: userExists.name },
  };

  return response;
};
