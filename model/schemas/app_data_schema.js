import S from "fluent-json-schema";



const itemSchema = S.object()
  .prop("id", S.string().format(S.FORMATS.UUID).required())
  .prop("name", S.string().required());

export const userSchema = {
  id: { type: "string" },
  email: { type: "email" },
  password: { type: "password" },
  token: { type: "string" },
  lastLoggedIn: { type: "timestamp" },
};
