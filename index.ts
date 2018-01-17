import { NappJS, NappJSService } from 'nappjs';

const assert = require("assert");
const path = require("path");
const CoreData = require("js-core-data");

const DATABASE_URL = process.env.DATABASE_URL || "sqlite://:memory:";
const DATABASE_DEBUG = !!process.env.DATABASE_DEBUG;

export default class NappJSCoreData extends NappJSService {
  public database: any;
  constructor() {
    super();

    const database = new CoreData(DATABASE_URL, { logging: DATABASE_DEBUG });

    this.database = database;
  }

  private schemaLoaded = false;
  async loadSchema() {
    if (this.schemaLoaded) {
      return;
    }
    this.schemaLoaded = true;
    const schemaPath = path.resolve(
      process.env.DATABASE_SCHEMA_PATH || "./schema/"
    );
    return this.database.schema.load(schemaPath);
  }

  public async syncSchema(options) {
    await this.loadSchema();
    await this.database.syncSchema(options);
  }

  public createContext() {
    return this.database.createContext();
  }

  async start(napp: NappJS) {
    await this.loadSchema();
    assert.ok(this.database, "database not loaded");

    if (process.env.NODE_ENV !== "production") {
      console.log("migrating/syncing database (NODE_ENV: !production)");
      return this.database.syncSchema({
        automigration: true,
        ignoreMissingVersion: true
      });
    }
  }

  public async stop(napp: NappJS) {
    return this.database.closeAllConnections();
  }
}
