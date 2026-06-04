import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import argon2 from "argon2";

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const handler = async (
  request: FastifyRequest<{ Body: z.infer<typeof createUserSchema> }>,
  reply: FastifyReply,
) => {
  try {
    const { email, password } = request.body;

    console.log({
      email,
      password,
    });

    const hash = await argon2.hash(password, {
      //esses sao os valores padrões da função de hash
      //para senhas, nao precisam ser modificados
      // type: argon2.argon2id,
      // memoryCost: 65536,
      // timeCost: 2,
      // parallelism: 1,
    });

    console.log({ hash });

    return reply.status(201).send({ message: "Usuário criado" });
  } catch (error) {
    console.log({ error });
    return reply.status(500).send({ message: error });
  }
};

export const createUserRoute = (app: FastifyInstance) => {
  app.post("/create-user", {
    schema: {
      security: [{ bearerAuth: [] }],
      tags: ["user"],
      summary: "Cria um usuário",
      body: createUserSchema,
      response: {
        201: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
    handler,
  });
};
