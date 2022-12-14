import itemRouteOptions from "./item_routes_options.js";
import { ITEM_ACTION_TYPES } from "../../../dispatchers/item/item_action_types.js";
import dispatch from "../../../dispatchers/app_dispatcher.js";
/**
 * /items/item Routes
 * endpoints:
 *  - /item/:id - GET, DELETE
 *  - /item     - POST, PUT
 */
const itemRoutes = async (fastify, options, done) => {
  // get an item by id
  fastify.get("/item/:id", itemRouteOptions.getItemOptions, getItemByIdHandler);
  // add a new item
  fastify.post("/item", itemRouteOptions.getAddItemOptions, addItemHandler);
  // update an existing item
  fastify.put(
    "/item",
    itemRouteOptions.getUpdateItemOptions,
    updateItemHandler
  );
  // delete an existing item
  fastify.delete(
    "/item/:id",
    itemRouteOptions.getDeleteItemOptions,
    deleteItemHandler
  );

  async function getItemByIdHandler(req, res) {
    try {
      const responseHandler = ({ item, error }) => {
        if (item) res.send({ item });
        else {
          res.statusCode = 404;
          res.send({
            error,
          });
        }
      };
      dispatch(
        ITEM_ACTION_TYPES.REQUEST_GET_ITEM_BY_ID,
        req.params.id,
        responseHandler
      );
    } catch (error) {
      res.send(error);
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
    try {
      const responseHandler = ({ item, error }) => {
        if (!error) {
          res.send({
            itemAddedSuccessfully: true,
            status: "item added successfully",
            item,
          });
        } else {
          res.statusCode = 400;
          res.send({
            itemAddedSuccessfully: false,
            status: "failed to add item",
            error,
          });
        }
      };
      dispatch(
        ITEM_ACTION_TYPES.REQUEST_ADD_ITEM,
        req.body.item,
        responseHandler
      );
    } catch (error) {
      res.send(error);
    }
  }

  async function updateItemHandler(req, res) {
    try {
      const responseHandler = ({ item, error }) => {
        if (!error) {
          res.send({
            item,
          });
        } else {
          res.statusCode = 400;
          res.send({ error });
        }
      };
      dispatch(
        ITEM_ACTION_TYPES.REQUEST_UPDATE_ITEM,
        req.body.item,
        responseHandler
      );
    } catch (error) {
      res.send(error);
    }
  }

  async function deleteItemHandler(req, res) {
    try {
      const responseHandler = ({ item, error }) => {
        if (!error) {
          res.send({
            item,
          });
        } else {
          res.statusCode = 400;
          res.send({ error });
        }
      };
      dispatch(
        ITEM_ACTION_TYPES.REQUEST_DELETE_ITEM,
        req.params.id,
        responseHandler
      );
    } catch (error) {
      res.send(error);
    }
  }
};

export default itemRoutes;
