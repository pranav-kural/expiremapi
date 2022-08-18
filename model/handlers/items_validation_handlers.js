import AppDataSchemas from "../schemas/app_data_schemas.js";
import ajvSchemaValidator from "../data/validators/ajv_schema_validator.js";

const validateObj = (obj, schema) => {
  const validateItem = ajvSchemaValidator.compile(schema);
  return validateItem(obj)
    ? { validationSuccess: true }
    : { validationErrors: validateItem.errors.pop() };
};

const validateItemObject = (
  item,
  { propertiesRequired, propertiesToExclude }
) =>
  validateObj(item, {
    ...AppDataSchemas.getItemObjectSchema(),
    ...(propertiesRequired && { required: propertiesRequired }),
    ...(propertiesToExclude && {
      not: {
        required: propertiesToExclude,
      },
    }),
  });

const validateItemId = (id) =>
  validateObj(id, {
    type: "string",
    format: "uuid",
  });

export default {
  validateItemObject,
  validateItemId,
};
