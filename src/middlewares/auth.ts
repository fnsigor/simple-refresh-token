import { ITokenPayload } from "@/@types/types";
import { JWT_SECRET } from "env";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Token não fornecido" });
  }

  //supoe que o header seja "Bearer hash"
  const [_, token] = authHeader.split(" ");

  const { id } = jwt.verify(token, JWT_SECRET) as ITokenPayload;

  request.userId = id;
};
