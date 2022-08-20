import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEMS_ACTION_TYPES } from "../../dispatchers/items/items_action_types.js";

const getAllItems = (responseHandler) => {
  console.log("####### getAll running");
  dispatch(ITEMS_ACTION_TYPES.COMMIT_GET_ALL_ITEMS, null, responseHandler);
};

const addItems = (items, responseHandler) =>
  dispatch(ITEMS_ACTION_TYPES.COMMIT_ADD_ITEMS, items, responseHandler);

/**
 * Updates an item. Updates only the properties provided.
 * To update an item completely, i.e., remove existing properties,
 * delete the item and create a new one.
 * @param {object} updatedItem item object with updated values
 * @returns item object with all its properties if item was found and updated, else object containing 'error'
 */
const updateItems = (updatedItems, responseHandler) =>
  dispatch(
    ITEMS_ACTION_TYPES.COMMIT_UPDATE_ITEMS,
    updatedItems,
    responseHandler
  );

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else boolean false
 */
const deleteItems = (itemIds, responseHandler) =>
  dispatch(ITEMS_ACTION_TYPES.COMMIT_DELETE_ITEMS, itemIds, responseHandler);

export default {
  getAllItems,
  addItems,
  updateItems,
  deleteItems,
};
