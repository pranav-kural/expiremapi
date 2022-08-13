import S from "fluent-json-schema";

const itemSchema = S.object()
  .prop("id", S.string().format(S.FORMATS.UUID).required())
  .prop("name", S.string().required());

const responseSchema = S.object()
  .title("Get All Items Schema")
  .prop("items", S.array().items(itemSchema).required());

export const getAllItemsOptions = {
  schema: {
    response: {
      200: responseSchema.valueOf(),
    },
  },
};

// export const getAllItemsOptions = {
//   schema: {
//     response: {
//       200: {
//         type: "object",
//         required: ["items"],
//         properties: {
//           items: {
//             type: "array",
//             format: "date",
//           },
//           message: { type: "string" },
//         },
//       },
//     },
//   },
// };

console.log(getAllItemsOptions.schema.response);
