import ItemsController from "../../controllers/items/items_controller.js";
import ItemsRouteOptions from "./items_routes_options.js";
import { itemsRoutesPath } from "./items_routes_paths.js";
import { itemRoutes } from "./item/item_routes.js";

export async function itemsRoutes(fastify, options, done) {
  // return available /items endpoints
  fastify.get("/", itemsEndpointsHandler);
  // return all items (belonging to current user)
  fastify.get("/all", ItemsRouteOptions.getAllItemsOptions, getAllItemsHandler);

  // handling request to /items/item/
  fastify.register(itemRoutes);
}

const itemsEndpointsHandler = (_, res) =>
  res.send(JSON.stringify(itemsRoutesPath));

const getAllItemsHandler = (req, res) =>
  res.send(ItemsController.getAllItems());
