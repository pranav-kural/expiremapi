import ItemsRouteOptions from "./item_routes_options.js";
import ItemsController from "../../../controllers/items/items_controller.js";
/**
 * /items/item Routes
 * endpoints:
 *  - /item/:id - GET, DELETE
 *  - /item     - POST, PUT
 */
export const itemRoutes = async (fastify, options, done) => {
  // get an item by id
  fastify.get(
    "/item/:id",
    ItemsRouteOptions.getItemOptions,
    getItemByIdHandler
  );
  // add a new item
  fastify.post("/item", ItemsRouteOptions.getAddItemOptions, addItemHandler);

  // fastify.delete(
  //   "/item/:id",
  //   ItemsRouteOptions.getDeleteItemOptions,
  //   getItemByIdHandler
  // );

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
        res.statusCode = 500;
        res.send({
          status: "failed to add item",
          error,
        });
      }
    } catch (err) {
      res.statusCode = 500;
      res.send({
        status: "failed to add item",
        error: err.message,
      });
    }
  }
};
