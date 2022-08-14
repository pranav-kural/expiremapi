import S from "fluent-json-schema";

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

const validateSchemaPropDefinition = (schemaPropDefinition) =>
  schemaPropDefinition.hasOwnProperty("type") &&
  schemaPropDefinition.hasOwnProperty("required");

const fluentSchemaPropertyGenerator = (schemaPropDefinition = {}) => {
  if (!validateSchemaPropDefinition(schemaPropDefinition)) {
    //TODO: throw error
    console.error(
      `fluentSchemaPropertyGenerator: invalid schema property definition: ${schemaPropDefinition}`
    );
  }
  const propType = schemaPropDefinition.type;
  const isRequired = schemaPropDefinition.required;
  console.log("propType", propType);
  console.log("isRequired", isRequired);
  console.log("SType", getSType(propType));
  return isRequired ? getSType(propType)().required() : getSType(propType)();
};

export const fluentSchemaGenerator = (schemaDefinition) => {
  const schemaObj = S.object;

  for (const [propName, schemaPropDefinition] of Object.entries(
    schemaDefinition
  )) {
    console.log("g: ", schemaPropDefinition);
    console.log("n: ", propName);
    // console.log("h", fluentSchemaPropertyGenerator(schemaPropDefinition));
    schemaObj().prop(
      propName,
      S.string()
      // fluentSchemaPropertyGenerator(schemaPropDefinition)
    );
  }
  console.log(JSON.stringify(schemaObj.valueOf()));
};

const itemSchema = S.object()
  .prop("id", S.string().format(S.FORMATS.UUID).required())
  .prop("name", S.string().required());
