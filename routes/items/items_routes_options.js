import AppDataSchemas from "../../model/schemas/app_data_schemas.js";

const getAllItemsOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: AppDataSchemas.getItemObjectSchema(),
      },
    },
  },
};

export default {
  getAllItemsOptions,
};
