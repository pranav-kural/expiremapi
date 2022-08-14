import AppDataSource from "../../model/app_data_source.js";

const appDataSource = new AppDataSource().getDataSource();

export const getItem = (id) => {
  return appDataSource.find((el) => el.id === id);
};
