import { itemsDataSource } from "../../model/data/items_data.js";

const _updateItems = (items) => (itemsDataSource.items = [...items]);

const getItemById = (id, responseHandler) => {
  const item = itemsDataSource.items.find((el) => el.id === id);
  responseHandler(
    item ? { item } : { error: `no item found matching the provided id ${id}` }
  );
};

const addItem = (item, responseHandler) => {
  itemsDataSource.items.push(item);
  responseHandler({ item }); // if successful, return the item (containing id)
};

const updateItem = (updatedItem, responseHandler) => {
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
    _updateItems(updatedItems);
    responseHandler({ item: itemUpdated });
  } else {
    responseHandler({
      error: `Could not find an item with the provided id ${updatedItem.id}`,
    });
  }
};

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else object containing error
 */
const deleteItem = (itemId, responseHandler) => {
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
    _updateItems(filteredItems);
    // itemDeleted contains the item deleted if found
    responseHandler({ item: itemDeleted });
  } else {
    responseHandler({
      error: `Could not find an item with the provided id ${itemId}`,
    });
  }
};

export default {
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
