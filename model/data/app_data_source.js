import { sampleItems } from "./sample_items.js";

class AppDataSource {
  getItemsDataSource = () => ({
    items: sampleItems,
  });
}

export default new AppDataSource();
