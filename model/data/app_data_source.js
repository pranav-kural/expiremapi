import { sampleItems } from "./sample_items.js";

class AppDataSource {
  getDataSource = () => ({
    items: sampleItems,
  });
}

export default new AppDataSource();
