const assert = require("assert");
const path = require("path");
const moment = require("moment");

process.env.SCRIPTS_PATH = path.join(__dirname, "../scripts");
const napp = require("nappjs").NewNappJS();

describe("migations", () => {
  before(() => {
    napp.addPlugin("nappjs-core-data", path.join(__dirname, "../index.js"));
    return napp.load();
  });

  beforeEach(() => {
    let coredata = napp.getService("nappjs-core-data");
    return coredata.syncSchema({ force: true });
  });
  after(() => {
    let coredata = napp.getService("nappjs-core-data");
    return coredata.stop();
  });

  it("should run script migrate", async () => {
    await napp.runScript("migrate");
  });
});
