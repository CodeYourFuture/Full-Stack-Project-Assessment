const sequential = require("sequential-ids");

let generator = new sequential.Generator({
  digits: 6,
  restore: "000",
});

generator.start();

module.exports = generator;