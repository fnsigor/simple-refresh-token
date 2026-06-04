import { USERS } from "db";
import { RequestBody, RequestSuccess } from "./schema";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { JWT_ALGORITHM, JWT_SECRET } from "env";

export const useCase = async ({
  email,
  password,
}: RequestBody): Promise<RequestSuccess> => {
  const userExists = USERS.get(email);

  if (!userExists) {
    throw new Error(`Credenciais inválidas`);
  }

  const passwordMatch = await argon2.verify(userExists.password, password);

  if (!passwordMatch) {
    throw new Error(`Credenciais inválidas`);
  }

  const jwtToken = jwt.sign(
    {
      id: userExists.id,
      email: userExists.email,
    },
    JWT_SECRET,
    {
      expiresIn: 15, //15 segundos
      algorithm: JWT_ALGORITHM,
    },
  );

  const response = {
    token: jwtToken,
    user: { email: userExists.email, name: userExists.name },
  };

  return response;
};
