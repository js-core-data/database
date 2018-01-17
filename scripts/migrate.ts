import { NappJS, NappJSScript } from 'nappjs';

const fs = require("fs");
const path = require("path");

const seedPath = path.resolve(process.env.SEEDS_PATH || "./seeds");

export default class NappJSCoreDataMigrateScript extends NappJSScript {
  async run(napp: NappJS) {
    let coredata = napp.getService("nappjs-core-data");
    return coredata.database.syncSchema({
      automigration: true,
      ignoreMissingVersion: true
    });
  }
}
