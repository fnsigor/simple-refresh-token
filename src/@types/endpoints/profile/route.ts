import { FastifyInstance } from "fastify";
import { querySchema, requestErrorSchema, requestSuccessSchema } from "./schema";
import { controller } from "./controller";

export const profileRoute = (app: FastifyInstance) => {
  app.get("/profile", {
    preHandler: auth,
    schema: {
      querystring: querySchema,
      security: [{ bearerAuth: [] }],
      tags: ["auth"],
      summary: "retorna o perfil do usuário",
      response: {
        200: requestSuccessSchema,
        401: requestErrorSchema,
        500: requestErrorSchema,
      },
    },
    handler: controller,
  });
};
