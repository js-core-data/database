import { NappJS, NappJSScript } from 'nappjs';

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const seedPath = path.resolve(process.env.SEEDS_PATH || "./seeds");

export default class NappJSCoreDataSeedScript extends NappJSScript {
  async run(napp: NappJS, seed: string | null) {
    assert.ok(seed, "seed name must be provided as first argument");
    let coredata = napp.getService("nappjs-core-data");
    return coredata.database.seed.run(path.join(seedPath, seed));
  }
}
