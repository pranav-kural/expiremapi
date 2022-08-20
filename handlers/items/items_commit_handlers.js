import { itemsDataSource } from "../../model/data/items_data.js";

const getAllItems = (responseHandler) => responseHandler(itemsDataSource.items);

const addItems = (items, responseHandler) =>
  responseHandler([...itemsDataSource.items, ...items]);

const updateItems = (updatedItems, responseHandler) =>
  responseHandler([...itemsDataSource.items, ...updatedItems]);

const deleteItems = (items, responseHandler) => responseHandler([...items]);

export default {
  getAllItems,
  addItems,
  updateItems,
  deleteItems,
};
