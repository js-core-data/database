import { NappJS, NappJSModule } from 'nappjs';

const fs = require("fs");
const path = require("path");

const seedPath = path.resolve(process.env.SEEDS_PATH || "./seeds");

export default class NappJSCoreDataSeedScript extends NappJSModule {
  async start(napp: NappJS, seed: string) {
    return napp.locals.database.seed.run(path.join(seedPath, seed));
  }
}

// module.exports = async (napp, seed) => {
//   return napp.locals.database.seed.run(path.join(seedPath, seed));
// };
