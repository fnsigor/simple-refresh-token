import { PORT } from "env";

import fastify from "fastify";
import cors from "@fastify/cors";
import Swagger from "@fastify/swagger";
import SwaggerUi from "@fastify/swagger-ui";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createUserRoute } from "./create-user/create-user";
import { loginRoute } from "./login/login";
import { profileRoute } from "./profile/profile";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, { origin: "*" });

app.register(Swagger, {
  openapi: {
    info: {
      title: "Autenticação",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  transform: jsonSchemaTransform,
});
app.register(SwaggerUi, {
  routePrefix: "/docs",
});

app.register(createUserRoute);
app.register(loginRoute);
app.register(profileRoute);

app.listen({ port: PORT, host: "0.0.0.0" }, () =>
  console.log(`server running on port ${PORT}`),
);
