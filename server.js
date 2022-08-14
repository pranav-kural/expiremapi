import fastifySwagger from "@fastify/swagger";
import Fastify from "fastify";
import { defaultRoutes } from "./routes/default/default_routes.js";
import { primaryRoutes } from "./routes/items/items_routes.js";

const fastify = Fastify({
  logger: true,
  ajv: {
    customOptions: {
      validateFormats: true,
    },
    // plugins: [ajvFormats],
  },
});

fastify.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "ExpiRem API",
      description: "ExpiRem API - Expiry Reminder",
      version: "1.0.1",
    },
  },
});

fastify.register(defaultRoutes);
fastify.register(primaryRoutes);

const startApp = async (fastify, portNumber) => {
  try {
    await fastify.listen({ port: portNumber });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startApp(fastify, 3000);
