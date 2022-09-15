import { sampleItems } from "./sample_items.js";

const AppDataSource = {
  getItemsDataSource: () => ({
    items: sampleItems,
  }),
};
export default AppDataSource;
