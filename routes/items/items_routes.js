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
  // get an item by id
  fastify.get(
    "/item/:id",
    ItemsRouteOptions.getItemOptions,
    getItemByIdHandler
  );
  // add a new item
  fastify.post("/item", ItemsRouteOptions.getAddItemOptions, addItemHandler);

  async function getItemByIdHandler(req, res) {
    res.send({ ...ItemsController.getItemById(req.params.id) });
  }

  async function addItemHandler(req, res) {
    /* 
     tries to add an item, if fails in adding item due to validation etc.
     returns an object containing error property
     if fails to add object due something else (exception during execution)
     returns object containing error property
     NOTE: not using try-catch or exception handling for handling errors during
     normal flow of application logic (hence some redundant code) 
    */
    try {
      const { itemAdded, error } = ItemsController.addItem(req.body.item);
      if (itemAdded && !error) {
        res.send({
          status: "item added",
          item: itemAdded,
        });
      } else {
        res.send({
          status: "failed to add item",
          error,
        });
      }
    } catch (err) {
      res.send({
        status: "failed to add item",
        err: err.message,
      });
    }
  }
};
