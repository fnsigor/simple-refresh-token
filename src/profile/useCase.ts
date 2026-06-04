import { USERS } from "db";
import { RequestQuery, RequestSuccess } from "./schema";

export const useCase = async ({
  email,
}: RequestQuery): Promise<RequestSuccess> => {
  const userExists = USERS.get(email);

  if (!userExists) {
    throw new Error(`Usuário com email "${email}" não cadastrado`);
  }

  return {
    user: {
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
      createdAt: userExists.createdAt,
    },
  };
};
