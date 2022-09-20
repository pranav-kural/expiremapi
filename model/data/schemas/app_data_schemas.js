import { itemObjectProperties } from "./properties/item/item_object_properties.js";
import { getSchemaProperties } from "../../utils/schema_generator.js";

class AppDataSchemas {
  getItemObjectSchema = () => ({
    type: "object",
    ...getSchemaProperties(itemObjectProperties),
  });
}

export default new AppDataSchemas();
