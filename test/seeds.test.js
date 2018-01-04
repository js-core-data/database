const assert = require("assert");
const path = require("path");
const moment = require("moment");

process.env.SCRIPTS_PATH = path.join(__dirname, "../scripts");
const napp = require("nappjs")();

describe("seeds", () => {
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

  it("should run test seed", async () => {
    await napp.runScript("seed", "test");
    // await app.seeds.run(app.database, "test");

    const context = napp.locals.database.createContext();

    let people = await context.getObjects("Person");
    assert.equal(people.length, 2);

    let chuck = await context.getObjectWithId("Person", 999);
    assert.equal(chuck.id, 999);
    assert.equal(chuck.firstname, "Chuck");
    assert.equal(chuck.lastname, "Norris");
    assert.equal(moment(chuck.birthdate).year(), 1900);

    let company = await chuck.getCompany();
    assert.ok(company);
    assert.equal(company.name, "Test company");

    let john = await context.getObjectWithId("Person", 666);
    assert.equal(john.id, 666);
    assert.equal(john.firstname, "John");
    assert.equal(john.lastname, "Doe");

    let company2 = await john.getCompany();
    assert.ok(company2);
    assert.equal(company2.name, "Another company");

    return context.saveAndDestroy();
  });
});
