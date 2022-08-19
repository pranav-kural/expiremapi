import itemHandlers from "../../model/handlers/item/item_handlers.js";

const { itemValidationHandlers, itemDataHandlers, itemActionHandlers } =
  itemHandlers;

export const ITEM_ACTION_TYPES = {
  REQUEST_GET_ITEM_BY_ID: "REQUEST_GET_ITEM_BY_ID",
  REQUEST_ADD_ITEM: "REQUEST_ADD_ITEM",
  REQUEST_UPDATE_ITEM: "REQUEST_UPDATE_ITEM",
  REQUEST_DELETE_ITEM: "REQUEST_DELETE_ITEM",
  VALIDATE_ITEM_OBJECT: "VALIDATE_ITEM_OBJECT",
  VALIDATE_ITEM_ID: "VALIDATE_ITEM_ID",
  GET_ITEM_BY_ID: "GET_ITEM_BY_ID",
  ADD_ITEM: "ADD_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
};

const ITEM_DATA_HANDLERS = {
  REQUEST_GET_ITEM_BY_ID: itemDataHandlers.getItemById,
  REQUEST_ADD_ITEM: itemDataHandlers.addItem,
  REQUEST_UPDATE_ITEM: itemDataHandlers.updateItem,
  REQUEST_DELETE_ITEM: itemDataHandlers.deleteItem,
};

const ITEM_VALIDATION_HANDLERS = {
  VALIDATE_ITEM_OBJECT: itemValidationHandlers.validateItemObject,
  VALIDATE_ITEM_ID: itemValidationHandlers.validateItemId,
};

const ITEM_ACTION_HANDLERS = {
  GET_ITEM_BY_ID: itemActionHandlers.getItemById,
  ADD_ITEM: itemActionHandlers.addItem,
  UPDATE_ITEM: itemActionHandlers.updateItem,
  DELETE_ITEM: itemActionHandlers.deleteItem,
};

export const ITEM_HANDLERS = {
  ...ITEM_VALIDATION_HANDLERS,
  ...ITEM_DATA_HANDLERS,
  ...ITEM_ACTION_HANDLERS,
};
