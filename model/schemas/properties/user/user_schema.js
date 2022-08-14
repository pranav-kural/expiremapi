export const userSchema = {
  id: { type: "string" },
  email: { type: "email" },
  password: { type: "password" },
  token: { type: "string" },
  lastLoggedIn: { type: "timestamp" },
};
