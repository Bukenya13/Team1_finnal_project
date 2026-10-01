const swaggerAutogen = require("swagger-autogen")();

const doc = [
  {
    info: {
      title: "Library Managment API - CSE 341 - Team 01",
      description: "Library Managment API - CSE 341 - Team 01",
    },
    host: "localhost:3000",
    schemes: ["http"],
  },
];

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
