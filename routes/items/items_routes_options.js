import AppDataSchemas from "../../model/schemas/app_data_schemas.js";

class ItemsRouteOptions {
  _appDataSchemas;
  getAllItemsOptions;
  getItemOptions;
  getAddItemOptions;

  constructor(dataSchemas) {
    this._appDataSchemas = dataSchemas ? dataSchemas : AppDataSchemas;
    this.initializeOptions();
  }

  initializeOptions() {
    this.getAllItemsOptions = {
      schema: {
        response: {
          200: {
            type: "array",
            items: this._appDataSchemas.getItemObjectSchema(),
          },
        },
      },
    };

    this.getItemOptions = {
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

    this.getAddItemOptions = {
      schema: {
        body: {
          type: "object",
          required: ["item"],
          properties: {
            item: this._appDataSchemas.getItemObjectSchema(),
          },
        },
        response: {
          200: {
            type: "object",
            required: ["status", "item"],
            properties: {
              item: this._appDataSchemas.getItemObjectSchema(),
              status: { type: "string" },
              itemAdded: { type: "object" },
            },
          },
        },
      },
    };
  }
}

export default new ItemsRouteOptions();
