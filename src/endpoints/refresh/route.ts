import { FastifyInstance } from "fastify";
import {
  requestHeaderSchema,
  requestErrorSchema,
  requestSuccessSchema,
} from "./schema";
import { controller } from "./controller";
import { auth } from "@/middlewares/auth";

export const refreshRoute = (app: FastifyInstance) => {
  app.get("/refresh", {
    preHandler: auth,
    schema: {
      security: [{ bearerAuth: [] }],
      headers: requestHeaderSchema,
      tags: ["auth"],
      summary: "usa o refresh token pra gerar um novo acess token",
      response: {
        201: requestSuccessSchema,
        500: requestErrorSchema,
      },
    },
    handler: controller,
  });
};
