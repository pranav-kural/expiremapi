export const getSchemaProperties = (schemaDefinition) => {
  let propKeys = {};
  let propsRequired = [];
  for (const [propName, propValues] of Object.entries(schemaDefinition)) {
    const { required, type, enumValues } = propValues;
    if (required) propsRequired.push(propName);
    const propType = type instanceof Array ? "array" : type;
    propKeys = {
      ...propKeys,
      [propName]: {
        type: propType,
        ...(enumValues && { enum: enumValues }),
      },
    };
  }
  return {
    required: propsRequired,
    properties: propKeys,
  };
};
