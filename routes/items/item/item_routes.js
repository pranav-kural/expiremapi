import itemsRouteOptions from "./item_routes_options.js";
import {
  itemController,
  itemsController,
} from "../../../controllers/items/items_controller.js";
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
    itemsRouteOptions.getItemOptions,
    getItemByIdHandler
  );
  // add a new item
  fastify.post("/item", itemsRouteOptions.getAddItemOptions, addItemHandler);

  fastify.delete(
    "/item/:id",
    itemsRouteOptions.getDeleteItemOptions,
    deleteItemHandler
  );

  async function getItemByIdHandler(req, res) {
    const item = itemController.getItemById(req.params.id);
    if (item) res.send({ item });
    else {
      res.statusCode = 404;
      res.send({
        error: `no item found matching the provided id ${req.params.id}`,
      });
    }
  }

  /**
   * Handles the request to add a new item
   * Returns a response containing "itemAddedSuccessfully" set to true only if
   * item is added successfully, else sets it to false. Also returns status message
   * and an error message if operation fails.
   * @param {*} req request object
   * @param {*} res response method
   */
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
      const { itemAdded, error } = itemController.addItem(req.body.item);
      if (!error) {
        res.send({
          itemAddedSuccessfully: true,
          status: "item added successfully",
          item: itemAdded,
        });
      } else {
        res.statusCode = 400;
        res.send({
          itemAddedSuccessfully: false,
          status: "failed to add item",
          error,
        });
      }
    } catch (err) {
      res.statusCode = 500;
      res.send({
        itemAddedSuccessfully: false,
        status: "failed to add item",
        error: err.message,
      });
    }
  }

  async function deleteItemHandler(req, res) {
    try {
      const { itemDeleted, error } = itemController.deleteItem(req.params.id);
      if (!error) {
        res.send({
          item: itemDeleted,
        });
      } else {
        res.statusCode = 400;
        res.send({ error });
      }
    } catch (error) {
      res.send(error);
    }
  }
};
