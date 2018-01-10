import { NappJS, NappJSModule } from 'nappjs';

const assert = require("assert");
const path = require("path");
const CoreData = require("js-core-data");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite://:memory:";
const DATABASE_DEBUG = !!process.env.DATABASE_DEBUG;

export default class NappJSCoreData extends NappJSModule {
  async register(napp: NappJS) {
    const database = new CoreData(DATABASE_URL, { logging: DATABASE_DEBUG });

    const schemaPath = path.resolve(
      process.env.DATABASE_SCHEMA_PATH || "./schema/"
    );

    await database.schema.load(schemaPath);

    napp.locals.database = database;
  }

  async start(napp: NappJS) {
    assert.ok(napp.locals.database, "database not loaded");
    
    if (process.env.NODE_ENV !== "production") {
      console.log("migrating/syncing database (NODE_ENV: !production)");
      return napp.locals.database.syncSchema({
        automigration: true,
        ignoreMissingVersion: true
      });
    }
  }
}