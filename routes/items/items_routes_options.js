import AppDataSchemas from "../../model/schemas/app_data_schema.js";

export const getItemOptions = {
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
      },
    },
    response: {
      200: AppDataSchemas.getItemObjectSchema(),
    },
  },
};
