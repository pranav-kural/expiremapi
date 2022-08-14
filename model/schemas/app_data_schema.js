import S from "fluent-json-schema";
import { itemObjectProperties } from "./properties/items/item_object_properties.js";
import { getSchemaProperties } from "./utils/schema_generator.js";

export const itemObjectSchema = {
  type: "object",
  ...getSchemaProperties(itemObjectProperties),
};

export const userSchema = {
  id: { type: "string" },
  email: { type: "email" },
  password: { type: "password" },
  token: { type: "string" },
  lastLoggedIn: { type: "timestamp" },
};
