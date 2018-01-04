const fs = require("fs");
const path = require("path");
const CoreData = require("js-core-data");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite://:memory:";
const DATABASE_DEBUG = !!process.env.DATABASE_DEBUG;

const register = async napp => {
  const database = new CoreData(DATABASE_URL, { logging: DATABASE_DEBUG });

  const schemaPath = path.resolve(
    process.env.DATABASE_SCHEMA_PATH || "./schema/"
  );

  await database.schema.load(schemaPath);

  napp.locals.database = database;
};

module.exports = {
  register
};
