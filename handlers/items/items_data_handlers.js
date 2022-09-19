import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEMS_ACTION_TYPES } from "../../dispatchers/items/items_action_types.js";
import itemsValidationHandlers from "./items_validation_handlers.js";
const getAllItems = (responseHandler) => {
  dispatch(ITEMS_ACTION_TYPES.COMMIT_GET_ALL_ITEMS, null, responseHandler);
};

const addItems = (items, responseHandler) => {
  // validate items object
  // items object containing item objects without id field
  const { validationSuccess, validationErrors } =
    itemsValidationHandlers.validateItemsObject(items, {
      propertiesToExclude: ["id"],
    });
  if (validationSuccess) {
    // TEMP: add id to each item
    const itemsWithIds = items.map((item) => ({ id: uuidv4(), ...item }));
    // dispatch action after successful validation
    dispatch(
      ITEMS_ACTION_TYPES.COMMIT_ADD_ITEMS,
      itemsWithIds,
      responseHandler
    );
  } else responseHandler({ error: validationErrors });
};

/**
 * Updates an item. Updates only the properties provided.
 * To update an item completely, i.e., remove existing properties,
 * delete the item and create a new one.
 * @param {object} updatedItem item object with updated values
 * @returns item object with all its properties if item was found and updated, else object containing 'error'
 */
const updateItems = (updatedItems, responseHandler) => {
  // validate items object
  // items object containing item objects
  const { validationSuccess, validationErrors } =
    itemsValidationHandlers.validateItemsObject(items);
  if (validationSuccess)
    dispatch(
      ITEMS_ACTION_TYPES.COMMIT_UPDATE_ITEMS,
      updatedItems,
      responseHandler
    );
  else responseHandler({ error: validationErrors });
};

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else boolean false
 */
const deleteItems = (itemIds, responseHandler) => {
  // validate items object
  // items object containing item objects
  const { validationSuccess, validationErrors } =
    itemsValidationHandlers.validateItemIds(itemIds);
  if (validationSuccess)
    dispatch(ITEMS_ACTION_TYPES.COMMIT_DELETE_ITEMS, itemIds, responseHandler);
  else responseHandler({ error: validationErrors });
};

export default {
  getAllItems,
  addItems,
  updateItems,
  deleteItems,
};
