import AppDataSchemas from "../../../model/schemas/app_data_schemas.js";

const getItemOptions = {
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
      200: {
        type: "object",
        required: ["item"],
        properties: {
          item: AppDataSchemas.getItemObjectSchema(),
        },
      },
    },
  },
};

const getAddItemOptions = {
  schema: {
    body: {
      type: "object",
      required: ["item"],
      properties: {
        item: AppDataSchemas.getAddItemObjectSchema(),
      },
    },
    response: {
      200: {
        type: "object",
        required: ["status", "item"],
        properties: {
          item: AppDataSchemas.getItemObjectSchema(),
          status: { type: "string" },
          itemAdded: { type: "object" },
        },
      },
    },
  },
  preValidation: (req, reply, done) => {
    if (req.body.item && req.body.item.hasOwnProperty("id")) {
      reply.send(
        new Error(
          "item object must not have id property. item ID will be auto-generated"
        )
      );
    }
    done();
  },
};

const getDeleteItemOptions = {
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
      200: {
        type: "object",
        required: ["item"],
        properties: {
          item: AppDataSchemas.getItemObjectSchema(),
        },
      },
      400: {
        type: "object",
        required: ["error"],
        properties: {
          error: {
            type: "string",
          },
        },
      },
    },
  },
};

export default {
  getItemOptions,
  getAddItemOptions,
  getDeleteItemOptions,
};
