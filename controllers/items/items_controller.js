import AppDataSource from "../../model/data/app_data_source.js";
import { validateAddItemObject } from "../../model/utils/validate_properties.js";
import { v4 as uuidv4 } from "uuid";

const itemsDataSource = AppDataSource.getItemsDataSource();

const getAllItems = () => itemsDataSource.items;

export const getItemById = (id) => {
  return itemsDataSource.items.find((el) => el.id === id);
};

/**
 * Adds an item to user's items collection
 * Validation: checks item object for schema validation
 * @param {item object} item item object to be added
 * @returns object containing item object if added successfully, else error
 */
export const addItem = (item) => {
  try {
    const { validationSuccess, validationErrors } = validateAddItemObject(item);
    if (validationSuccess && !validationErrors) {
      // generate item id
      const itemId = uuidv4();
      // add id property to item object
      item = { id: itemId, ...item };
      // add new item
      itemsDataSource.items.push(item);
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
