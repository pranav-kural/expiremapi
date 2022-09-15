import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEMS_ACTION_TYPES } from "../../dispatchers/items/items_action_types.js";

const getAllItems = (responseHandler) =>
  dispatch(ITEMS_ACTION_TYPES.DATA_GET_ALL_ITEMS, null, responseHandler);

/**
 * Adds an item to user's items collection
 * Validation: checks item object for schema validation
 * @param {item object} item item object to be added
 * @returns object containing item object if added successfully, else error
 */
const addItems = (items, responseHandler) =>
  dispatch(ITEMS_ACTION_TYPES.DATA_ADD_ITEMS, items, responseHandler);

/**
 * Updates an item that belongs to the user
 * If no item exists with the provided id, returns an error
 * @param {*} item item object with updated values
 * @returns updated item object if successful, else error
 */
const updateItems = (updatedItems, responseHandler) =>
  dispatch(ITEMS_ACTION_TYPES.DATA_UPDATE_ITEMS, updatedItems, responseHandler);

/**
 * Deletes an item that belongs to the user
 * If no item exists with the provided id, returns an error
 * @param {*} id id of item to be deleted
 * @returns the item object if deletion successful, else error
 */
const deleteItems = (itemIds, responseHandler) =>
  dispatch(ITEMS_ACTION_TYPES.DATA_DELETE_ITEMS, itemIds, responseHandler);

export default {
  getAllItems,
  addItems,
  updateItems,
  deleteItems,
};
