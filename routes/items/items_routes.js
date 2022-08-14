import { getItem } from "../../controllers/items/items_controller.js";
import { getItemOptions } from "./items_routes_options.js";

export async function primaryRoutes(fastify, options) {
  fastify.get("/items/item/:id", getItemOptions, async (request, reply) => {
    reply.send({ ...getItem(req.params.id) });
  });
}
