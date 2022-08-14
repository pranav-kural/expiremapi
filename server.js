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
