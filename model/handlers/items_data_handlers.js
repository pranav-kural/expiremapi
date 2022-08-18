// import app's data source
import AppDataSource from "../data/app_data_source.js";
// import method for validating items data
import itemsValidationHandlers from "./items_validation_handlers.js";
import itemsActionHandler, { ITEMS_ACTIONS } from "./items_action_handlers.js";
import { v4 as uuidv4 } from "uuid";
// get items data source from the app's data source
const itemsDataSource = AppDataSource.getItemsDataSource();

const getAllItems = () =>
  itemsActionHandler.dispatch(ITEMS_ACTIONS.GET_ALL_ITEMS);

const getItemById = (id) =>
  itemsActionHandler.dispatch(ITEMS_ACTIONS.GET_ITEM_BY_ID, id);

const addItem = (item) => {
  try {
    const { validationSuccess, validationErrors } =
      itemsValidationHandlers.validateItemObject(item, {
        propertiesRequired: ["name"],
        propertiesToExclude: ["id"],
      });
    if (validationSuccess && !validationErrors) {
      // generate item id
      const itemId = uuidv4();
      // add id property to item object
      item = { id: itemId, ...item };
      // add new item
      itemsActionHandler.dispatch(ITEMS_ACTIONS.ADD_ITEM, item);
      // return added item (including item id)
      return { itemAdded: item };
    } else {
      return {
        error: `validation failed for addItem: ${validationErrors.message}`,
      };
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Updates an item. Updates only the properties provided.
 * To update an item completely, i.e., remove existing properties,
 * delete the item and create a new one.
 * @param {object} updatedItem item object with updated values
 * @returns item object with all its properties if item was found and updated, else object containing 'error'
 */
const updateItem = (updatedItem) => {
  try {
    // validate item object
    const { validationSuccess, validationErrors } =
      itemsValidationHandlers.validateItemObject(updatedItem, {
        propertiesRequired: ["id"],
      });
    // call update item action; returns object containing updated item or error
    return validationSuccess
      ? itemsActionHandler.dispatch(ITEMS_ACTIONS.UPDATE_ITEM, updatedItem)
      : {
          error: `validation failed for the provided item object: ${validationErrors.message}`,
        };
  } catch (err) {
    throw err;
  }
};

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else boolean false
 */
const deleteItem = (itemId) => {
  try {
    // validate item id
    const { validationSuccess, validationErrors } =
      itemsValidationHandlers.validateItemId(itemId);
    return validationSuccess
      ? itemsActionHandler.dispatch(ITEMS_ACTIONS.DELETE_ITEM, itemId)
      : {
          error: `validation failed for the provided item id: ${validationErrors.message}`,
        };
  } catch (err) {
    throw err;
  }
};

export default {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
