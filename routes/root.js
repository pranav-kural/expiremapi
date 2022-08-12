const bodyJSONSchema = {
  type: "object",
  required: ["hello"],
  properties: {
    hello: "string",
  },
};

const schema = {
  body: bodyJSONSchema,
};

// queryString: {
//       type: "object",
//       properties: {
//         hello: "string",
//       },
//     },

export async function primaryRoutes(fastify, options) {
  const opts = {
    schema: {
      body: {
        type: "string",
        properties: {
          hello: "string",
        },
      },
    },
  };

  fastify.get("/", opts, async (request, reply) => {
    return { route: "primary" };
  });
}
