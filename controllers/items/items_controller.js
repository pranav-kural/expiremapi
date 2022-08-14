import AppDataSource from "../../model/app_data_source.js";

class ItemsController {
  _appDataSource;

  constructor(dataSource) {
    this._appDataSource = dataSource
      ? dataSource
      : AppDataSource.getDataSource();
  }

  getItemById(id) {
    return this._appDataSource.find((el) => el.id === id);
  }
}

export default new ItemsController();
