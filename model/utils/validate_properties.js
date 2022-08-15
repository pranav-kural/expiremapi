import AppDataSchemas from "../schemas/app_data_schemas.js";
import { itemObjectProperties } from "../schemas/properties/item/item_object_properties.js";
import ajvSchemaValidator from "./ajv_schema_validator.js";
import { getSchemaProperties } from "./schema_generator.js";

export const validateItemObject = (item) => {
  const itemObjectSchema = AppDataSchemas.getItemObjectSchema();
  const validateItem = ajvSchemaValidator.compile(itemObjectSchema);
  return validateItem(item);
};

export const validateAddItemObject = (item) => {
  const addItemObjectSchema = AppDataSchemas.getAddItemObjectSchema();
  const validateItem = ajvSchemaValidator.compile(addItemObjectSchema);
  return validateItem(item)
    ? { validationSuccess: true }
    : { validationErrors: validateItem.errors };
};
