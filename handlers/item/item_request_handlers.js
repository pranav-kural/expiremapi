import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEM_ACTION_TYPES } from "../../dispatchers/item/item_action_types.js";

const getItemById = (id, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.DATA_GET_ITEM_BY_ID, id, responseHandler);

const addItem = (item, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.DATA_ADD_ITEM, item, responseHandler);

const updateItem = (item, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.DATA_UPDATE_ITEM, item, responseHandler);

const deleteItem = (id, responseHandler) =>
  dispatch(ITEM_ACTION_TYPES.DATA_DELETE_ITEM, id, responseHandler);

export default {
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
