import { FastifyReply, FastifyRequest } from "fastify";
import { RequestQuery, RequestError, RequestSuccess } from "./schema";
import { useCase } from "./useCase";

export const controller = async (
  request: FastifyRequest<{ Querystring: RequestQuery }>,
  reply: FastifyReply,
) => {
  try {
    const { email } = request.query;

    const response = await useCase({ email });

    return reply.status(200).send(response);
  } catch (error: any) {
    console.log({ error });
    return reply
      .status(500)
      .send({ message: error?.message ?? "erro ao buscar dados do perfil" });
  }
};
