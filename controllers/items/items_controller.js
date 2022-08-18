import itemsDataHandlers from "../../model/handlers/items_data_handlers.js";

const getAllItems = () => itemsDataHandlers.getAllItems();

const getItemById = (id) => itemsDataHandlers.getItemById(id);

/**
 * Adds an item to user's items collection
 * Validation: checks item object for schema validation
 * @param {item object} item item object to be added
 * @returns object containing item object if added successfully, else error
 */
const addItem = (item) => itemsDataHandlers.addItem(item);

/**
 * Updates an item that belongs to the user
 * If no item exists with the provided id, returns an error
 * @param {*} item item object with updated values
 * @returns updated item object if successful, else error
 */
const updateItem = (item) => {
  try {
    return itemsDataHandlers.updateItem(item);
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
    return itemsDataHandlers.deleteItem(id);
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
