export const getSchemaProperties = (schemaDefinition) => {
  let propKeys = {};
  let propsRequired = [];
  for (const [propName, propValues] of Object.entries(schemaDefinition)) {
    const { required, type, format, enumValues } = propValues;
    if (required) propsRequired.push(propName);
    const propType = type instanceof Array ? "array" : type;
    propKeys = {
      ...propKeys,
      [propName]: {
        type: propType,
        ...(format && { format }),
        ...(enumValues && { enum: enumValues }),
      },
    };
  }
  return {
    required: propsRequired,
    properties: propKeys,
  };
};
