import { itemObjectProperties } from "./properties/item/item_object_properties.js";
import { getSchemaProperties } from "../utils/schema_generator.js";

class AppDataSchemas {
  getItemObjectSchema = () => ({
    type: "object",
    ...getSchemaProperties(itemObjectProperties),
  });
  getAddItemObjectSchema = () => ({
    type: "object",
    ...getSchemaProperties(itemObjectProperties),
    required: ["name"], // requires only name, not id
    not: {
      required: ["id"],
    },
  });
}

export default new AppDataSchemas();
