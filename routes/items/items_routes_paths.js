export const itemsRoutesPath = {
  "/": {
    description: "",
    requires: "",
    returns: "",
  },
  "/all": {
    get: {
      description: "get all items for the current user",
      requires: "token",
      returns: "Array containing item objects",
    },
  },
  "/item/:id": {},
  "/item": {},
};
