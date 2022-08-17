// import app's data source
import AppDataSource from "../data/app_data_source.js";
// attach to the items data source
const itemsDataSource = AppDataSource.getItemsDataSource();

const getAllItems = () => itemsDataSource.items;

const getItemById = (id) => itemsDataSource.items.find((el) => el.id === id);

const addItem = (item) => itemsDataSource.items.push(item);

const deleteItem = (id) => {};

export default {
  getAllItems,
  getItemById,
  addItem,
  deleteItem,
};
