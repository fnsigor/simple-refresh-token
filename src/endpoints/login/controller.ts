import { FastifyReply, FastifyRequest } from "fastify";
import { RequestBody } from "./schema";
import { useCase } from "./useCase";

export const controller = async (
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;
    const ip = request.ip;

    const response = await useCase({ email, password, ip });
    return reply.status(200).send(response);
  } catch (error) {
    console.log({ error });
    return reply.status(500).send({ message: "erro" });
  }
};
