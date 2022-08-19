// import app's data source
import AppDataSource from "../../data/app_data_source.js";
// get items data source from the app's data source
const itemsDataSource = AppDataSource.getItemsDataSource();

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
