import { sampleItems } from "./sample_items.js";

class AppDataSource {
  getDataSource = () => {
    return sampleItems;
  };
}

export default new AppDataSource();
