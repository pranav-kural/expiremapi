import { v4 as uuidv4 } from "uuid";
import dispatch from "../../dispatchers/app_dispatcher.js";
import { ITEM_ACTION_TYPES } from "../../dispatchers/item/item_action_types.js";
import itemValidationHandlers from "./item_validation_handlers.js";

const getItemById = (id, responseHandler) => {
  // validate item id
  const { validationSuccess, validationErrors } =
    itemValidationHandlers.validateItemId(id);
  if (validationSuccess)
    dispatch(ITEM_ACTION_TYPES.COMMIT_GET_ITEM_BY_ID, id, responseHandler);
  else responseHandler({ error: validationErrors });
};

const addItem = (item, responseHandler) => {
  const { validationSuccess, validationErrors } =
    itemValidationHandlers.validateItemObject(item, {
      propertiesRequired: ["name"],
      propertiesToExclude: ["id"],
    });
  if (validationSuccess && !validationErrors) {
    // generate item id
    const itemId = uuidv4();
    // add id property to item object
    item = { id: itemId, ...item };
    // add new item
    dispatch(ITEM_ACTION_TYPES.COMMIT_ADD_ITEM, item, responseHandler);
  } else {
    responseHandler({
      error: `validation failed for addItem: ${validationErrors}`,
    });
  }
};

/**
 * Updates an item. Updates only the properties provided.
 * To update an item completely, i.e., remove existing properties,
 * delete the item and create a new one.
 * @param {object} updatedItem item object with updated values
 * @returns item object with all its properties if item was found and updated, else object containing 'error'
 */
const updateItem = (updatedItem, responseHandler) => {
  // validate item object
  const { validationSuccess, validationErrors } =
    itemValidationHandlers.validateItemObject(updatedItem, {
      propertiesRequired: ["id"],
    });
  // if validation successful, dispatch update item action, else return error
  validationSuccess
    ? dispatch(
        ITEM_ACTION_TYPES.COMMIT_UPDATE_ITEM,
        updatedItem,
        responseHandler
      )
    : responseHandler({
        error: `validation failed for the provided item object: ${validationErrors}`,
      });
};

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else boolean false
 */
const deleteItem = (itemId, responseHandler) => {
  // validate item id
  const { validationSuccess, validationErrors } =
    itemValidationHandlers.validateItemId(itemId);
  return validationSuccess
    ? dispatch(ITEM_ACTION_TYPES.COMMIT_DELETE_ITEM, itemId, responseHandler)
    : responseHandler({
        error: `validation failed for the provided item id: ${validationErrors}`,
      });
};

export default {
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
