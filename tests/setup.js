const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const client = require("../config/redis");


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.createConnection(uri, {});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await client.quit();
});
