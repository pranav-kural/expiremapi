import { sampleItems } from "../../model/sample_items.js";
import { getAllItemsOptions } from "./items_routes_options.js";

export async function primaryRoutes(fastify, options) {
  fastify.get("/", getAllItemsOptions, async (request, reply) => {
    return { items: [...sampleItems] };
  });
}
