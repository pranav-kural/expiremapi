export const itemObjectSchema = {
  id: {
    required: true,
    type: "uuid",
    info: "item id",
  },
  name: {
    required: true,
    type: "string",
    info: "item name",
  },
  description: {
    required: false,
    type: "string",
    info: "item description",
  },
  category: {
    required: false,
    type: "uuid",
    info: "category id of the category item belongs to",
  },
  quantity: {
    required: false,
    type: "number",
    info: "item quantity",
  },
  quantityType: {
    required: false,
    type: ["unit", "pack", "bag", "capsule"],
    info: "item quantity's unit type",
  },
  location: {
    required: false,
    type: "string",
    info: "location where the item is stored",
  },
  locationType: {
    type: ["isle", "box", "room"],
    info: "type of location where the item is stored",
  },
  expiryDate: {
    required: false,
    type: "timestamp",
    info: "date, and optionally time, when the item expires",
  },
  expiryNotificationEnabled: {
    required: false,
    type: "boolean",
    info: "enables notification before item expires",
  },
  expiryNotificationPriority: {
    required: false,
    type: ["low", "medium", "high"],
    info: "priority of notifications before item expires",
  },
  expiryNotificationSchedule: {
    required: false,
    type: "list<timestamp>",
    info: "schedule of notifications before item expires",
  },
  consumedOn: {
    required: false,
    type: "timestamp",
    info: "timestamp for when the item was declared consumed by user",
  },
  consumedBeforeOrAfter: {
    required: false,
    type: ["null", "before", "after"],
    info: "whether the item was consumed before or after it expires, or never",
  },
  discardedOn: {
    required: false,
    type: "timestamp",
    info: "timestamp for when the item was declared discarded by user",
  },
  discardedBeforeOrAfter: {
    required: false,
    type: ["null", "before", "after"],
    info: "whether the item was discarded before or after it expires, or never",
  },
  expired: {
    required: true,
    type: "boolean",
    info: "whether the item is expired",
  },
};
