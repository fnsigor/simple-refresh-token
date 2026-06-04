import argon2 from "argon2";
import { RequestBody, RequestSuccess } from "./schema";

export const useCase = async ({
  email,
  password,
}: RequestBody): Promise<RequestSuccess> => {
  const hash = await argon2.hash(password);

  console.log({ email, hash });

  return { message: "Usuário criado" };
};
