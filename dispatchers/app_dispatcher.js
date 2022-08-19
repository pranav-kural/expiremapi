import { ITEMS_ACTION_TYPES, ITEMS_HANDLERS } from "./items/items_actions.js";
import { ITEM_ACTION_TYPES, ITEM_HANDLERS } from "./items/item_actions.js";

const ACTION_HANDLERS = {
  ...ITEM_HANDLERS,
  ...ITEMS_HANDLERS,
};

const ACTION_TYPES = {
  ...ITEM_ACTION_TYPES,
  ...ITEMS_ACTION_TYPES,
};

const dispatch = (actionType, payload, next) => {
  // check if type is a valid items action
  if (!Object.values(ACTION_TYPES).includes(actionType))
    next(new Error(`invalid action type supplied to dispatch: ${actionType}`));
  // attempt to execute the operation
  try {
    let params = [...(payload ? [payload] : []), ...(next ? [next] : [])];
    console.log("****** params: ", [...params]);
    console.log(actionType);
    // dispatch the action
    ACTION_HANDLERS[actionType](...params);
  } catch (error) {
    throw error;
  }
};

export default dispatch;
