import { NappJS, NappJSModule } from 'nappjs';

const fs = require("fs");
const path = require("path");

const seedPath = path.resolve(process.env.SEEDS_PATH || "./seeds");

export default class NappJSCoreDataMigrateScript extends NappJSModule {
  async start(napp: NappJS) {
    return napp.locals.database.syncSchema({
      automigration: true,
      ignoreMissingVersion: true
    })
  }
}