const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library Managment API - CSE 341 - Team 01",
    description: "Library Managment API - CSE 341 - Team 01",
  },
  host: "team1-finnal-project.onrender.com",
  schemes: ["https"],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "GitHub OAuth token. Paste as: Bearer <token> (get one from /auth/github)",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
