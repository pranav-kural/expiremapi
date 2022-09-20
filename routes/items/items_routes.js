import ItemsRouteOptions from "./items_routes_options.js";
import itemsRoutesPath from "./items_routes_paths.js";
import itemRoutes from "./item/item_routes.js";
import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEMS_ACTION_TYPES } from "../../dispatchers/items/items_action_types.js";

export async function itemsRoutes(fastify, options, done) {
  // return available /items endpoints
  fastify.get("/", itemsEndpointsHandler);
  // return all items (belonging to current user)
  fastify.get("/all", ItemsRouteOptions.getAllItemsOptions, getAllItemsHandler);
  // add multiple items
  fastify.post(
    "/add",
    ItemsRouteOptions.getAddItemsOptions,
    addMultipleItemsHandler
  );
  // update multiple items
  fastify.put(
    "/update",
    ItemsRouteOptions.getUpdateItemsOptions,
    updateMultipleItemsHandler
  );
  // delete multiple items
  fastify.delete(
    "/delete",
    ItemsRouteOptions.getDeleteItemsOptions,
    deleteMultipleItemsHandler
  );

  // handling request to /items/item/
  fastify.register(itemRoutes);
}

const itemsEndpointsHandler = (_, res) =>
  res.send(JSON.stringify(itemsRoutesPath));

const getAllItemsHandler = (_, res) =>
  dispatch(ITEMS_ACTION_TYPES.REQUEST_GET_ALL_ITEMS, null, (items) =>
    res.send(items)
  );

const addMultipleItemsHandler = (req, res) =>
  dispatch(ITEMS_ACTION_TYPES.REQUEST_ADD_ITEMS, req.body.items, (items) =>
    res.send(items)
  );

const updateMultipleItemsHandler = (req, res) =>
  dispatch(ITEMS_ACTION_TYPES.REQUEST_UPDATE_ITEMS, req.body.items, (items) =>
    res.send(items)
  );

const deleteMultipleItemsHandler = (req, res) =>
  dispatch(ITEMS_ACTION_TYPES.REQUEST_DELETE_ITEMS, req.body.items, (items) =>
    res.send(items)
  );
