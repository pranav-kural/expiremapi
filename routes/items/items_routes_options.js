import AppDataSchemas from "../../model/schemas/app_data_schemas.js";

class ItemsRouteOptions {
  _appDataSchemas;

  constructor(dataSchemas) {
    this._appDataSchemas = dataSchemas ? dataSchemas : AppDataSchemas;
  }

  getItemOptions() {
    return {
      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
          },
        },
        response: {
          200: this._appDataSchemas.getItemObjectSchema(),
        },
      },
    };
  }
}

export default new ItemsRouteOptions();
