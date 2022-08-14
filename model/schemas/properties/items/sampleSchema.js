export const testSchema = {
  id: {
    required: true,
    type: "string",
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
};
