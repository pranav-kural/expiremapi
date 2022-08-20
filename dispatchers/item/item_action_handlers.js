import itemHandlers from "../../handlers/item/item_handlers.js";

const { itemRequestHandlers, itemDataHandlers, itemCommitHandlers } =
  itemHandlers;

const ITEM_REQUEST_HANDLERS = {
  REQUEST_GET_ITEM_BY_ID: itemRequestHandlers.getItemById,
  REQUEST_ADD_ITEM: itemRequestHandlers.addItem,
  REQUEST_UPDATE_ITEM: itemRequestHandlers.updateItem,
  REQUEST_DELETE_ITEM: itemRequestHandlers.deleteItem,
};

const ITEM_DATA_HANDLERS = {
  DATA_GET_ITEM_BY_ID: itemDataHandlers.getItemById,
  DATA_ADD_ITEM: itemDataHandlers.addItem,
  DATA_UPDATE_ITEM: itemDataHandlers.updateItem,
  DATA_DELETE_ITEM: itemDataHandlers.deleteItem,
};

const ITEM_COMMIT_HANDLERS = {
  COMMIT_GET_ITEM_BY_ID: itemCommitHandlers.getItemById,
  COMMIT_ADD_ITEM: itemCommitHandlers.addItem,
  COMMIT_UPDATE_ITEM: itemCommitHandlers.updateItem,
  COMMIT_DELETE_ITEM: itemCommitHandlers.deleteItem,
};

export default {
  ...ITEM_REQUEST_HANDLERS,
  ...ITEM_DATA_HANDLERS,
  ...ITEM_COMMIT_HANDLERS,
};
