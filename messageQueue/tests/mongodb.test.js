const mongoose = require("mongoose");
const mongoose_url = "mongodb://127.0.0.1:27017/shopDEV";
const TestSchema = mongoose.Schema({
  name: String,
});
const Test = mongoose.model("Test", TestSchema);
describe("Mongooes connection", () => {
  let connection;
  beforeAll(async () => {
    connection = await mongoose.connect(mongoose_url);
  });
  afterAll(async () => {
    connection.disconnect();
  });
  it("Should connect to mongoose", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
  it("Should save a document to mongo", async () => {
    const test = await Test({ name: "codelife" });
    await test.save();
    expect(test.isNew).toBe(false);
  });
  it("Should found a document has stored", async () => {
    const test = await Test.findOne({ name: "codelife" });
    expect(test).toBeDefined();
    expect(test.name).toBe("codelife");
  });
});
