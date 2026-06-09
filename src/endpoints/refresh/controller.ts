import { FastifyReply, FastifyRequest } from "fastify";
import { RequestHeader } from "./schema";
import { useCase } from "./useCase";

export const controller = async (
  request: FastifyRequest<{ Headers: RequestHeader }>,
  reply: FastifyReply,
) => {
  try {
    const refreshToken = request.headers["refresh-token"];
    const ip = request.ip;

    const response = await useCase({ refreshToken, requestIp: ip });

    return reply.status(201).send(response);
  } catch (error) {
    console.log({ error });
    return reply.status(500).send({ message: "erro" });
  }
};
