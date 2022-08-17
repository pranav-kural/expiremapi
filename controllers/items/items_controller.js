import itemsDataHandlers from "../../model/handlers/items_data_handlers.js";
import itemsDataValidators from "./utils/items_data_validators.js";

import { v4 as uuidv4 } from "uuid";

const getAllItems = () => itemsDataHandlers.getAllItems();

const getItemById = (id) => itemsDataHandlers.getItemById(id);

/**
 * Adds an item to user's items collection
 * Validation: checks item object for schema validation
 * @param {item object} item item object to be added
 * @returns object containing item object if added successfully, else error
 */
const addItem = (item) => {
  try {
    const { validationSuccess, validationErrors } =
      itemsDataValidators.validateAddItemObject(item);
    if (validationSuccess && !validationErrors) {
      // generate item id
      const itemId = uuidv4();
      // add id property to item object
      item = { id: itemId, ...item };
      // add new item
      itemsDataHandlers.addItem(item);
      // return added item (including item id)
      return { itemAdded: item };
    } else {
      const error = validationErrors.pop();
      return { error: `${error.schemaPath} ${error.message}` };
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Updates an item that belongs to the user
 * If no item exists with the provided id, returns an error
 * @param {*} item item object with updated values
 * @returns updated item object if successful, else error
 */
const updateItem = (item) => {
  try {
    // validate item object
    const { validationSuccess, validationErrors } =
      itemsDataValidators.validateItemObject(item);
    if (validationSuccess && !validationErrors) {
      // attempt to update the item
      const itemUpdated = itemsDataHandlers.updateItem(item);
      // return updated item with all properties, else error
      return itemUpdated
        ? { itemUpdated }
        : { error: `Could not find an item with the provided id ${id}` };
    } else {
      return {
        error: `validation failed for the provided item object: ${validationErrors}`,
      };
    }
  } catch (err) {
    return { error: err.message };
  }
};

/**
 * Deletes an item that belongs to the user
 * If no item exists with the provided id, returns an error
 * @param {*} id id of item to be deleted
 * @returns the item object if deletion successful, else error
 */
const deleteItem = (id) => {
  try {
    const itemDeleted = itemsDataHandlers.deleteItem(id);

    return itemDeleted
      ? { itemDeleted }
      : { error: `Could not find an item with the provided id ${id}` };
  } catch (err) {
    return { error: err.message };
  }
};

export const itemsController = {
  getAllItems,
};

export const itemController = {
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};

export default {
  ...itemsController,
  ...itemController,
};
