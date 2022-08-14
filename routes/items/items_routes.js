import { sampleItems } from "../../model/sample_items.js";
import { getItemOptions } from "./items_routes_options.js";

export async function primaryRoutes(fastify, options) {
  fastify.get("/items/item/:id", getItemOptions, async (request, reply) => {
    reply.send({ ...sampleItems[request.params.id] });
  });
}
