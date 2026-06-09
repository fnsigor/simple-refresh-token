import { FastifyInstance } from "fastify";
import { bodySchema, requestErrorSchema, requestSuccessSchema } from "./schema";
import { controller } from "./controller";

export const createUserRoute = (app: FastifyInstance) => {
  app.post("/create-user", {
    schema: {
      security: [{ bearerAuth: [] }],
      tags: ["user"],
      summary: "Cria um usuário",
      body: bodySchema,
      response: {
        201: requestSuccessSchema,
        500: requestErrorSchema,
      },
    },
    handler: controller,
  });
};
