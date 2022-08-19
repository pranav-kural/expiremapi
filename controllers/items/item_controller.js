import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEM_ACTION_TYPES } from "../../dispatchers/items/item_actions.js";

const getItemById = (id, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.REQUEST_GET_ITEM_BY_ID, id, responseHandler);

const addItem = (item, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.REQUEST_ADD_ITEM, item, responseHandler);

const updateItem = (item, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.REQUEST_UPDATE_ITEM, item, responseHandler);

const deleteItem = (id, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.REQUEST_DELETE_ITEM, id, responseHandler);

export default {
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
