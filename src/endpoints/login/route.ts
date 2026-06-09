import { FastifyInstance } from "fastify";
import {
  requestBodySchema,
  requestErrorSchema,
  requestSuccessSchema,
} from "./schema";
import { controller } from "./controller";

export const loginRoute = (app: FastifyInstance) => {
  app.post("/login", {
    schema: {
      security: [{ bearerAuth: [] }],
      tags: ["auth"],
      summary: "autentica o usuário",
      body: requestBodySchema,
      response: {
        201: requestSuccessSchema,
        500: requestErrorSchema,
      },
    },
    handler: controller,
  });
};
