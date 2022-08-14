import { itemObjectSchema } from "../../model/schemas/app_data_schema.js";

export const getItemOptions = {
  schema: {
    response: {
      200: itemObjectSchema,
    },
  },
};
