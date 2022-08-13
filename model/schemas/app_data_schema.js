import S from "fluent-json-schema";

// allow nullable types
// https://ajv.js.org/json-schema.html#nullable

export const getSType = (type) => {
  // available types: https://ajv.js.org/json-schema.html#json-data-type
  const defaultTypes = {
    array: S.array,
    bool: S.boolean,
    enum: S.enum,
    integer: S.integer,
    object: S.object,
    null: S.null,
    number: S.number,
    string: S.string,
  };
  const customTypes = {
    uuid: S.string().format("uuid"),
    email: S.string().format("email"),
    timestamp: S.string().format("date-time"),
  };
  const STypes = {
    ...defaultTypes,
    ...customTypes,
  };
  return STypes[type];
};

const itemSchema = S.object()
  .prop("id", S.string().format(S.FORMATS.UUID).required())
  .prop("name", S.string().required());

export const userSchema = {
  id: { type: "string" },
  email: { type: "email" },
  password: { type: "password" },
  token: { type: "string" },
  lastLoggedIn: { type: "timestamp" },
};
