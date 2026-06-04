import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { USERS } from "db";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "env";
import { ITokenPayload } from "@/@types/types";

export const profileSchema = z.object({
  email: z.email(),
});

const errorSchema = z.object({
  message: z.string(),
});

const successSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    createdAt: z.string(),
  }),
});

type RequestReturn =
  | z.infer<typeof successSchema>
  | z.infer<typeof errorSchema>;

const handler = async (
  request: FastifyRequest<{ Querystring: z.infer<typeof profileSchema> }>,
  reply: FastifyReply<{ Reply: RequestReturn }>,
) => {
  try {
    const { email } = request.query;

    const userExists = USERS.get(email);

    if (!userExists) {
      throw new Error(`Usuário com email "${email}" não cadastrado`);
    }

    const response: z.infer<typeof successSchema> = {
      user: {
        id: userExists.id,
        email: userExists.email,
        name: userExists.name,
        createdAt: userExists.createdAt,
      },
    };

    return reply.status(200).send(response);
  } catch (error) {
    console.log({ error });
    return reply
      .status(500)
      .send({ message: error?.message ?? "erro ao buscar dados do perfil" });
  }
};

export const profileRoute = (app: FastifyInstance) => {
  app.get("/profile", {
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
          return reply.status(401).send({ message: "Token não fornecido" });
        }

        //supoe que o header seja "Bearer hash"
        const [_, token] = authHeader.split(" ");

        const { id } = jwt.verify(token, JWT_SECRET) as ITokenPayload;

        request.userId = id;
      } catch (error) {
        console.log({ error });
        throw new Error("Não autorizado");
      }
    },
    schema: {
      querystring: profileSchema,
      security: [{ bearerAuth: [] }],
      tags: ["auth"],
      summary: "retorna o perfil do usuário",
      response: {
        200: successSchema,
        401: errorSchema,
        500: errorSchema,
      },
    },
    handler,
  });
};
