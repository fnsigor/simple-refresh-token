import { TokenFactory } from "@/utils/TokenFactory";
import { FastifyReply, FastifyRequest } from "fastify";
import { JsonWebTokenError } from "jsonwebtoken";

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ message: "Token não fornecido" });
    }

    //supoe que o header seja "Bearer hash"
    const [_, token] = authHeader.split(" ");

    const { id } = TokenFactory.decode(token, "access");

    request.userId = id;
  } catch (error) {
    const hasRefreshToken = request.headers["refresh-token"];
    const isExpiredTokenError =
      error instanceof JsonWebTokenError && error.message === "jwt expired";

    const expiredTokenButHasRefresh = isExpiredTokenError && hasRefreshToken;

    if (!expiredTokenButHasRefresh) {
      throw new Error("Token expirado");
    }
  }
};
