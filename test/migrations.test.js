const assert = require("assert");
const path = require("path");
const moment = require("moment");

process.env.SCRIPTS_PATH = path.join(__dirname, "../scripts");
const napp = require("nappjs").NewNappJS();

describe("migations", () => {
  before(() => {
    napp.addPlugin("core-data", path.join(__dirname, "../index.js"));
    return napp.load();
  });

  beforeEach(() => {
    return napp.locals.database.syncSchema({ force: true });
  });
  after(() => {
    return napp.locals.database.closeAllConnections();
  });

  it("should run script migrate", async () => {
    await napp.runScript("migrate");
  });
});
