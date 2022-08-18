import Ajv from "ajv";
import ajvFormats from "ajv-formats";

const ajvSchemaValidator = new Ajv({
  coerceTypes: true, // change data type of data to match type keyword
  useDefaults: true, // replace missing properties and items with the values from corresponding default keyword
  removeAdditional: true, // remove additional properties
  // Explicitly set allErrors to `false`.
  allErrors: false,
});

ajvFormats(ajvSchemaValidator);

export default ajvSchemaValidator;
