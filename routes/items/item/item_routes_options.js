import AppDataSchemas from "../../../model/schemas/app_data_schemas.js";

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

const itemObjectSchema = {
  type: "object",
  required: ["item"],
  properties: {
    item: AppDataSchemas.getItemObjectSchema(),
  },
};

const getItemContainerSchema = ({
  propertiesRequired = ["id", "name"],
  propertiesToExclude = [],
}) => ({
  type: "object",
  required: ["item"],
  properties: {
    item: {
      ...AppDataSchemas.getItemObjectSchema(),
      required: [...propertiesRequired],
      ...(propertiesToExclude &&
        propertiesToExclude.length !== 0 && {
          not: {
            required: [...propertiesToExclude],
          },
        }),
    },
  },
});

// pre-validation to ensure no ID supplied when adding new item
const addItemPreValidation = (req, reply, done) => {
  if (req.body.item && req.body.item.hasOwnProperty("id")) {
    reply.send(
      new Error(
        "item object must not have id property. item ID will be auto-generated"
      )
    );
  }
  done();
};

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
      200: itemObjectSchema,
    },
  },
};

const getAddItemOptions = {
  schema: {
    body: getItemContainerSchema({
      propertiesRequired: ["name"],
      propertiesToExclude: ["id"],
    }),
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
  preValidation: addItemPreValidation,
};

console.log(
  getItemContainerSchema({
    propertiesRequired: ["id"],
  }).properties
);
const getUpdateItemOptions = {
  schema: {
    body: getItemContainerSchema({
      propertiesRequired: ["id"],
    }),
    response: {
      200: itemObjectSchema,
      400: errorMessageSchema,
    },
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
      200: itemObjectSchema,
      400: errorMessageSchema,
    },
  },
};

export default {
  getItemOptions,
  getAddItemOptions,
  getUpdateItemOptions,
  getDeleteItemOptions,
};
