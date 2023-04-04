const db = require("../config/connection");
const { User, Pet, Supply } = require("../models");

const petSeeds = require("./petSeeds.json");
const userSeeds = require("./userSeeds.json");
const supplySeeds = require("./supplyData.json");

db.once("open", async () => {
  try {
    await Pet.deleteMany({});
    await Supply.deleteMany({});
    await User.deleteMany({});

    await Pet.insertMany(petSeeds);
    await Supply.insertMany(supplySeeds);
    await User.insertMany(userSeeds);

    console.log("Data seeded!");
    process.exit(0);
  } catch (error) {
    throw error;
  }
});
