import { itemObjectProperties } from "../properties/item/item_object_properties.js";
import { customAjv } from "./custom_ajv.js";
import { getSchemaProperties } from "./schema_generator.js";

export const validateItemObject = (item) => {
  const itemObjectSchema = {
    type: "object",
    ...getSchemaProperties(itemObjectProperties),
  };
  console.log(itemObjectSchema);
  const validateItem = customAjv.compile(itemObjectSchema);
  return validateItem(item);
};
