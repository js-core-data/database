const assert = require("assert");
const path = require("path");

const napp = require("nappjs").NewNappJS();

describe("database", () => {
  before(async () => {
    napp.addPlugin("nappjs-core-data", path.join(__dirname, "../index.js"));
    await napp.start();
  });

  after(() => {
    let coredata = napp.getService("nappjs-core-data");
    return coredata.stop();
  });

  it("should have correct model selected", () => {
    let coredata = napp.getService("nappjs-core-data");
    assert.equal(coredata.database.model.version, "v0.0.2");
  });

  describe("context", () => {
    before(() => {
      return require("./seed-data")(
        napp.getService("nappjs-core-data").database
      );
    });

    it("should allow creating object", () => {
      let context = napp.getService("nappjs-core-data").createContext();
      context.create("Person", { firstname: "Jane", lastname: "Siri" });
      return context.saveAndDestroy();
    });
    it("should allow fetching object", async () => {
      let context = napp.getService("nappjs-core-data").createContext();
      let person = await context.getObjectWithId("Person", 1);
      assert.equal(person.firstname, "John");
      assert.equal(person.lastname, "Doe");
      let company = await person.getCompany();
      assert.equal(company.name, "Test company");
      return context.saveAndDestroy();
    });
    it("should allow updating object", async () => {
      let context = napp.getService("nappjs-core-data").createContext();
      let person = await context.getObjectWithId("Person", 1);
      person.firstname = "Johny";
      return context.saveAndDestroy();
    });
    it("should allow deleting object", async () => {
      let context = napp.getService("nappjs-core-data").createContext();
      let person = await context.getObjectWithId("Person", 1);
      context.deleteObject(person);
      return context.saveAndDestroy();
    });
  });
});
