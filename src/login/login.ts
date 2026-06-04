import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import argon2 from "argon2";
import { USERS } from "db";
import jwt from "jsonwebtoken";
import { JWT_ALGORITHM, JWT_SECRET } from "env";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const errorSchema = z.object({
  message: z.string(),
});

const successSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.email(),
  }),
  token: z.string(),
});

type RequestReturn =
  | z.infer<typeof successSchema>
  | z.infer<typeof errorSchema>;

const handler = async (
  request: FastifyRequest<{ Body: z.infer<typeof loginSchema> }>,
  reply: FastifyReply<{ Reply: RequestReturn }>,
) => {
  try {
    const { email, password } = request.body;

    const userExists = USERS.get(email);

    if (!userExists) {
      throw new Error(`Credenciais inválidas`);
    }

    const passwordMatch = await argon2.verify(userExists.password, password);

    if (!passwordMatch) {
      throw new Error(`Credenciais inválidas`);
    }

    const jwtToken = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
      },
      JWT_SECRET,
      {
        expiresIn: 15,
        //15 segundos
        algorithm: JWT_ALGORITHM,
      },
    );

    const response: z.infer<typeof successSchema> = {
      token: jwtToken,
      user: { email: userExists.email, name: userExists.name },
    };

    return reply.status(201).send(response);
  } catch (error) {
    console.log({ error });
    return reply.status(500).send({ message: "erro" });
  }
};

export const loginRoute = (app: FastifyInstance) => {
  app.post("/login", {
    schema: {
      security: [{ bearerAuth: [] }],
      tags: ["auth"],
      summary: "autentica o usuário",
      body: loginSchema,
      response: {
        201: successSchema,
        500: errorSchema,
      },
    },
    handler,
  });
};
