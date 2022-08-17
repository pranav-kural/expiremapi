// import app's data source
import AppDataSource from "../data/app_data_source.js";
// get items data source from the app's data source
const itemsDataSource = AppDataSource.getItemsDataSource();

const getAllItems = () => itemsDataSource.items;

const updateItems = (items) => (itemsDataSource.items = items);

const getItemById = (id) => itemsDataSource.items.find((el) => el.id === id);

const addItem = (item) => itemsDataSource.items.push(item);

/**
 * Updates an item. Updates only the properties provided.
 * To update an item completely, i.e., remove existing properties,
 * delete the item and create a new one.
 * @param {object} updatedItem item object with updated values
 * @returns item object with all its properties if item was found and updated, else false
 */
const updateItem = (updatedItem) => {
  let itemUpdated = false;
  // update item if present and update itemUpdated
  const filteredItems = itemsDataSource.items.map((currentItem) => {
    if (currentItem.id === updatedItem.id) {
      itemUpdated = {
        ...currentItem,
        ...updatedItem,
      };
      return itemUpdated;
    }
    return currentItem;
  });
  // update items if itemUpdated not null (item was found)
  if (itemUpdated) updateItems(filteredItems);
  // item object with all its properties if item was found and updated,
  // else returns false
  return itemUpdated;
};

/**
 * Deletes an item matching the provided id
 * @param {string} itemId id of item to be deleted
 * @returns item object if item found and deleted, else boolean false
 */
const deleteItem = (itemId) => {
  let itemDeleted = false;
  // delete item if present and update itemDeleted
  const filteredItems = itemsDataSource.items.filter((currentItem) => {
    if (currentItem.id === itemId) {
      itemDeleted = currentItem;
      return false;
    }
    return true;
  });
  // update items if itemDeleted not null (item was found)
  if (itemDeleted) updateItems(filteredItems);
  // itemDeleted contains the item deleted if found, else boolean false
  return itemDeleted;
};

export default {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
