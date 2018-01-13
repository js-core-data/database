import { NappJS, NappJSModule } from 'nappjs';

const fs = require("fs");
const path = require("path");
const assert = require("assert")

const seedPath = path.resolve(process.env.SEEDS_PATH || "./seeds");

export default class NappJSCoreDataSeedScript extends NappJSModule {
  async start(napp: NappJS, seed: string | null) {
    assert.ok(seed, "seed name must be provided as first argument")
    return napp.locals.database.seed.run(path.join(seedPath, seed));
  }
}

// module.exports = async (napp, seed) => {
//   return napp.locals.database.seed.run(path.join(seedPath, seed));
// };
