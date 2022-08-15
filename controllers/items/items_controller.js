import AppDataSource from "../../model/app_data_source.js";
import { validateItemObject } from "../../model/schemas/utils/validate_properties.js";

class ItemsController {
  _appDataSource;

  constructor(dataSource) {
    this._appDataSource = dataSource
      ? dataSource
      : AppDataSource.getDataSource();
  }

  getAllItems = () => this._appDataSource.items;

  getItemById(id) {
    return this._appDataSource.items.find((el) => el.id === id);
  }

  addItem(item) {
    try {
      const validItemObject = validateItemObject(item);
      if (validItemObject) this._appDataSource.items.push(item);
      else throw Error("item object validation failed");
      return { itemAdded: item };
    } catch (error) {
      return { error };
    }
  }
}

export default new ItemsController();
