import fastify from "fastify";
import ItemsController from "../../controllers/items/items_controller.js";
import ItemsRouteOptions from "./items_routes_options.js";
import { itemsRoutesPath } from "./items_routes_paths.js";

export async function itemsRoutes(fastify, options, done) {
  // return available /items endpoints
  fastify.get("/", itemsEndpoints);
  // return all items (belonging to current user)
  fastify.get("/all", ItemsRouteOptions.getAllItemsOptions, getAllItemsHandler);

  // handling request to /items/item/
  fastify.register(itemRoutes);
}

const itemsEndpoints = (_, res) => res.send(JSON.stringify(itemsRoutesPath));

const getAllItemsHandler = (req, res) =>
  res.send(ItemsController.getAllItems());

const itemRoutes = async (fastify, options, done) => {
  fastify.get(
    "/item/:id",
    ItemsRouteOptions.getItemOptions,
    getItemByIdHandler
  );

  fastify.post("/item", ItemsRouteOptions.getAddItemOptions, addItemHandler);

  async function getItemByIdHandler(req, res) {
    res.send({ ...ItemsController.getItemById(req.params.id) });
  }

  async function addItemHandler(req, res) {
    const { itemAdded, error } = ItemsController.addItem(req.body.item);
    if (itemAdded && !error) {
      res.send({
        status: "item added",
        item: itemAdded,
      });
    } else {
      console.log("ite: ", itemAdded);
      console.log("err: ", error);
      res.send({
        error,
        status: error,
      });
    }
  }
};
