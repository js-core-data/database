const fs = require("fs");
const path = require("path");

const seedPath = path.resolve(process.env.SEEDS_PATH || "./seeds");

module.exports = async (napp, seed) => {
  return napp.locals.database.seed.run(path.join(seedPath, seed));
};
