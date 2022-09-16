import { itemsDataSource } from "../../model/data/items_data.js";

const getAllItems = (responseHandler) => responseHandler(itemsDataSource.items);

const addItems = (items, responseHandler) => {
  items.forEach((item) => itemsDataSource.items.push(item));
  responseHandler({ items }); // if successful, return the item (containing id)
};

const updateItems = (items, responseHandler) => {
  let itemsUpdated;
  // update item if present and update itemUpdated
  const updatedItems = itemsDataSource.items.map((currentItem) => {
    if (items.contains(currentItem.id)) {
      const updatedItem = {
        ...currentItem,
        ...items.find((el) => el.id === currentItem.id),
      };
      itemsUpdated.push(updatedItem);
      return updatedItem;
    }
    return currentItem;
  });
  // return item object with all its properties if item was found and updated,
  // else return error message
  if (itemsUpdated.length !== 0) {
    // update items if itemUpdated not null (item was found)
    _setNewItems(updatedItems);
    if (itemsUpdated.length === items.length)
      responseHandler({ items: itemsUpdated });
    else {
      const itemsUpdatedIds = itemsUpdated.map((el) => el.id);
      responseHandler({
        items: itemsUpdated,
        warning: `some items for were found, ids: ${items
          .filter((itemId) => !itemsUpdatedIds.contains(itemId))
          .join(", ")}`,
      });
    }
  } else {
    responseHandler({
      error: `Could not find any items with the provided ids`,
    });
  }
};

const _setNewItems = (newItems) => (itemsDataSource.items = newItems);

const deleteItems = (items, responseHandler) => {
  let itemsDeleted;
  // delete item if present and update itemDeleted
  const filteredItems = itemsDataSource.items.filter((currentItem) => {
    // if current item's id present in items to be deleted
    if (items.contains(currentItem.id)) {
      itemsDeleted.push(currentItem);
      return false;
    }
    return true;
  });
  // update items if itemDeleted not null (item was found)
  if (itemsDeleted.length !== 0) {
    _setNewItems(filteredItems);
    // itemDeleted contains the item deleted if found
    responseHandler({ items: itemsDeleted });
  } else {
    responseHandler({
      error: `Could not find any items with the provided ids`,
    });
  }
};

export default {
  getAllItems,
  addItems,
  updateItems,
  deleteItems,
};
