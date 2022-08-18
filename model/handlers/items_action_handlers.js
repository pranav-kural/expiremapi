// import app's data source
import AppDataSource from "../data/app_data_source.js";
// get items data source from the app's data source
const itemsDataSource = AppDataSource.getItemsDataSource();

const getAllItems = () => itemsDataSource.items;

const updateItems = (items) => (itemsDataSource.items = [...items]);

const getItemById = (id) => itemsDataSource.items.find((el) => el.id === id);

const addItem = (item) => itemsDataSource.items.push(item);

const updateItem = (updatedItem) => {
  let itemUpdated = false;
  // update item if present and update itemUpdated
  const updatedItems = itemsDataSource.items.map((currentItem) => {
    if (currentItem.id === updatedItem.id) {
      itemUpdated = {
        ...currentItem,
        ...updatedItem,
      };
      return itemUpdated;
    }
    return currentItem;
  });
  // return item object with all its properties if item was found and updated,
  // else return error message
  if (itemUpdated) {
    // update items if itemUpdated not null (item was found)
    updateItems(updatedItems);
    return { itemUpdated };
  } else {
    return {
      error: `Could not find an item with the provided id ${updatedItem.id}`,
    };
  }
};

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else object containing error
 */
const deleteItem = (itemId) => {
  let itemDeleted;
  // delete item if present and update itemDeleted
  const filteredItems = itemsDataSource.items.filter((currentItem) => {
    if (currentItem.id === itemId) {
      itemDeleted = currentItem;
      return false;
    }
    return true;
  });
  // update items if itemDeleted not null (item was found)
  if (itemDeleted) {
    updateItems(filteredItems);
    // itemDeleted contains the item deleted if found
    return { itemDeleted };
  } else {
    return {
      error: `Could not find an item with the provided id ${itemId}`,
    };
  }
};

const ITEMS_ACTION_METHOD = {
  GET_ALL_ITEMS: getAllItems,
  ADD_ITEM: addItem,
  GET_ITEM_BY_ID: getItemById,
  UPDATE_ITEM: updateItem,
  DELETE_ITEM: deleteItem,
};

export const ITEMS_ACTIONS = {
  GET_ALL_ITEMS: "GET_ALL_ITEMS",
  ADD_ITEM: "ADD_ITEM",
  GET_ITEM_BY_ID: "GET_ITEM_BY_ID",
  UPDATE_ITEM: "UPDATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
};

const dispatch = (type, payload) => {
  // check if type is a valid items action
  if (!Object.keys(ITEMS_ACTIONS).includes(type))
    return {
      error: `invalid action type supplied to itemsActionHandler: ${type}`,
    };
  // attempt to execute the operation
  try {
    return payload
      ? ITEMS_ACTION_METHOD[type](payload)
      : ITEMS_ACTION_METHOD[type]();
  } catch (error) {
    throw error;
  }
};

export default {
  dispatch,
};
