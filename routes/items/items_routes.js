import ItemsController from "../../controllers/items/items_controller.js";
import ItemsRouteOptions from "./items_routes_options.js";

export async function primaryRoutes(fastify, options) {
  fastify.get(
    "/items/item/:id",
    ItemsRouteOptions.getItemOptions(),
    async (request, reply) => {
      reply.send({ ...ItemsController.getItemById(request.params.id) });
    }
  );
}
