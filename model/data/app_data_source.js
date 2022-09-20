import db from "./sample_db.js";

const AppDataSource = {
  getItemsDataSource: () => ({
    items: db.items,
  }),
};
export default AppDataSource;
