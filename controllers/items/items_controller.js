import itemsDataHandler from "../../model/handlers/items_data_handlers.js";
import { validateAddItemObject } from "../../model/utils/validate_properties.js";
import { v4 as uuidv4 } from "uuid";

const getAllItems = () => itemsDataHandler.getAllItems();

const getItemById = (id) => itemsDataHandler.getItemById(id);

/**
 * Adds an item to user's items collection
 * Validation: checks item object for schema validation
 * @param {item object} item item object to be added
 * @returns object containing item object if added successfully, else error
 */
const addItem = (item) => {
  try {
    const { validationSuccess, validationErrors } = validateAddItemObject(item);
    if (validationSuccess && !validationErrors) {
      // generate item id
      const itemId = uuidv4();
      // add id property to item object
      item = { id: itemId, ...item };
      // add new item
      itemsDataHandler.addItem(item);
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
 * Deletes an item that belongs to the user
 * If no item exists with the provided id, returns an error
 * @param {*} id id of item to be deleted
 * @returns the item object if deletion successful, else error
 */
const deleteItem = (id) => {
  let itemDeleted;

  itemsDataSource.items;

  return { item };

  return { error };
};

export const itemsController = {
  getAllItems,
};

export const itemController = {
  getItemById,
  addItem,
};

export default {
  ...itemsController,
  ...itemController,
};
