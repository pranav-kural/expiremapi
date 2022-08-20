import itemsHandlers from "../../handlers/items/items_handlers.js";

const { itemsRequestHandlers, itemsDataHandlers, itemsCommitHandlers } =
  itemsHandlers;

const ITEMS_REQUEST_HANDLERS = {
  REQUEST_GET_ALL_ITEMS: itemsRequestHandlers.getAllItems,
  REQUEST_ADD_ITEMS: itemsRequestHandlers.addItems,
  REQUEST_UPDATE_ITEMS: itemsRequestHandlers.updateItems,
  REQUEST_DELETE_ITEMS: itemsRequestHandlers.deleteItems,
};

const ITEMS_DATA_HANDLERS = {
  DATA_GET_ALL_ITEMS: itemsDataHandlers.getAllItems,
  DATA_ADD_ITEMS: itemsDataHandlers.addItems,
  DATA_UPDATE_ITEMS: itemsDataHandlers.updateItems,
  DATA_DELETE_ITEMS: itemsDataHandlers.deleteItems,
};

const ITEMS_COMMIT_HANDLERS = {
  COMMIT_GET_ALL_ITEMS: itemsCommitHandlers.getAllItems,
  COMMIT_ADD_ITEMS: itemsCommitHandlers.addItems,
  COMMIT_UPDATE_ITEMS: itemsCommitHandlers.updateItems,
  COMMIT_DELETE_ITEMS: itemsCommitHandlers.deleteItems,
};

export default {
  ...ITEMS_REQUEST_HANDLERS,
  ...ITEMS_DATA_HANDLERS,
  ...ITEMS_COMMIT_HANDLERS,
};
