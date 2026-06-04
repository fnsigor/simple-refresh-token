import { FastifyReply, FastifyRequest } from "fastify";
import { RequestBody, RequestError, RequestSuccess } from "./schema";
import { useCase } from "./useCase";

export const controller = async (
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;

    const response = await useCase({ email, password });
  } catch (error) {
    console.log({ error });
    return reply.status(500).send({ message: "erro" });
  }
};
