import AppDataSchemas from "../schemas/app_data_schemas.js";
import ajvSchemaValidator from "../data/validators/ajv_schema_validator.js";

const validateObj = (obj, schema) => {
  const validateItem = ajvSchemaValidator.compile(schema);
  return validateItem(obj)
    ? { validationSuccess: true }
    : { validationErrors: validateItem.errors.pop() };
};

const validateItemObject = (item) =>
  validateObj(item, AppDataSchemas.getItemObjectSchema());

const validateAddItemObject = (item) =>
  validateObj(item, AppDataSchemas.getAddItemObjectSchema());

const validateItemId = (id) =>
  validateObj(id, {
    type: "string",
    format: "uuid",
  });

export default {
  validateItemObject,
  validateAddItemObject,
  validateItemId,
};
