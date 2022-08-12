import Fastify from "fastify";
import addFormats from "ajv-formats";
import { primaryRoutes } from "./routes/root.js";
const fastify = Fastify({
  logger: true,
  ajv: {
    plugins: [addFormats],
  },
});

fastify.register(primaryRoutes);
(async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
