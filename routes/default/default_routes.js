export async function defaultRoutes(fastify, options, done) {
  fastify.get("/", async (request, reply) => {
    reply.send({ message: "ExpiRem API" });
  });

  done();
}
