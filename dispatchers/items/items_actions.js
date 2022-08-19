import itemsHandlers from "../../model/handlers/items/items_handlers.js";

const { itemsValidationHandlers, itemsDataHandlers, itemsActionHandlers } =
  itemsHandlers;

export const ITEMS_ACTION_TYPES = {
  REQUEST_GET_ALL_ITEMS: "REQUEST_GET_ALL_ITEMS",
  REQUEST_ADD_ITEMS: "REQUEST_ADD_ITEMS",
  REQUEST_UPDATE_ITEMS: "REQUEST_UPDATE_ITEMS",
  REQUEST_DELETE_ITEMS: "REQUEST_DELETE_ITEMS",
  VALIDATE_ITEMS_OBJECT: "VALIDATE_ITEMS_OBJECT",
  GET_ALL_ITEMS: "GET_ALL_ITEMS",
  ADD_ITEMS: "ADD_ITEMS",
  UPDATE_ITEMS: "UPDATE_ITEMS",
  DELETE_ITEMS: "DELETE_ITEMS",
};

const ITEMS_DATA_HANDLERS = {
  REQUEST_GET_ALL_ITEMS: itemsDataHandlers.getAllItems,
  REQUEST_ADD_ITEMS: itemsDataHandlers.addItems,
  REQUEST_UPDATE_ITEMS: itemsDataHandlers.updateItems,
  REQUEST_DELETE_ITEMS: itemsDataHandlers.deleteItems,
};

const ITEMS_VALIDATION_HANDLERS = {
  VALIDATE_ITEMS_OBJECT: itemsValidationHandlers.validateItemsObject,
};

const ITEMS_ACTION_HANDLERS = {
  GET_ALL_ITEMS: itemsActionHandlers.getAllItems,
  ADD_ITEMS: itemsActionHandlers.addItems,
  UPDATE_ITEMS: itemsActionHandlers.updateItems,
  DELETE_ITEMS: itemsActionHandlers.deleteItems,
};

export const ITEMS_HANDLERS = {
  ...ITEMS_VALIDATION_HANDLERS,
  ...ITEMS_DATA_HANDLERS,
  ...ITEMS_ACTION_HANDLERS,
};
