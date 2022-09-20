import AppDataSchemas from "../../model/data/schemas/app_data_schemas.js";

const itemsArraySchema = {
  type: "object",
  required: ["items"],
  properties: {
    items: getItemsArraySchema(),
  },
};

const errorMessageSchema = {
  type: "object",
  required: ["error"],
  properties: {
    error: { type: "string" },
    statusCode: { type: "number" },
    message: { type: "string" },
    schemaPath: { type: "string" },
    msg: { type: "string" },
  },
};

const getItemsArraySchema = ({
  propertiesRequired,
  propertiesToExclude,
} = {}) => ({
  type: "array",
  items: {
    type: "object",
    ...AppDataSchemas.getItemObjectSchema(),
    ...(propertiesRequired && { required: [...propertiesRequired] }),
    ...(propertiesToExclude &&
      propertiesToExclude.length !== 0 && {
        not: {
          required: [...propertiesToExclude],
        },
      }),
  },
});

// pre-validation to ensure no ID supplied when adding new item
const addItemsPreValidation = (req, reply, done) => {
  if (req.body.items) {
    const items = req.body.items;
    for (let item in items) {
      if (item.hasOwnProperty("id")) {
        reply.send(
          new Error(
            "item object must not have id property. item ID will be auto-generated"
          )
        );
        break;
      }
    }
  }
  done();
};

const getAllItemsOptions = {
  schema: {
    response: {
      200: getItemsArraySchema(),
    },
  },
};

const getAddItemsOptions = {
  schema: {
    body: {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          ...getItemsArraySchema({
            propertiesRequired: ["name"],
            propertiesToExclude: ["id"],
          }),
        },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["status", "items"],
        properties: {
          items: getItemsArraySchema(),
          status: { type: "string" },
        },
      },
    },
  },
  preValidation: addItemsPreValidation,
};

const getUpdateItemsOptions = {
  schema: {
    body: {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          ...getItemsArraySchema(),
        },
      },
    },
    response: {
      200: {
        type: "object",
        required: ["items"],
        properties: {
          items: getItemsArraySchema(),
          status: { type: "string" },
        },
      },
      400: errorMessageSchema,
    },
  },
};

const getDeleteItemsOptions = {
  schema: {
    params: {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          type: "array",
          items: {
            type: "string",
            format: "uuid",
          },
        },
      },
    },
    response: {
      200: itemsArraySchema,
      400: errorMessageSchema,
    },
  },
};

export default {
  getAllItemsOptions,
  getAddItemsOptions,
  getUpdateItemsOptions,
  getDeleteItemsOptions,
};
