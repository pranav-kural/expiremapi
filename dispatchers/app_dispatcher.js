import ITEM_HANDLERS from "./item/item_action_handlers.js";
import ITEMS_HANDLERS from "./items/items_actions_handlers.js";
import { ITEM_ACTION_TYPES } from "./item/item_action_types.js";
import { ITEMS_ACTION_TYPES } from "./items/items_action_types.js";

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

    console.log(
      `%c###### dispatching action: ${actionType} ######`,
      "color:blue; font-size:50px"
    );
    // dispatch the action
    ACTION_HANDLERS[actionType](...params);
  } catch (error) {
    throw error;
  }
};

export default dispatch;
