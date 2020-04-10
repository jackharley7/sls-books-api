const { Seeder } = require('./../../seed/seeder');
const seedData = require('./../../seed/books.seed.json');

const seeder = new Seeder('books');

const CreateTable = async () => {
  const exists = await seeder.hasTable();

  if (exists) {
    await seeder.deleteTable();
  }

  await seeder.createTable();
};

const CleanupTable = async () => {
  const exists = await seeder.hasTable();

  if (exists) {
    await seeder.deleteTable();
  }
};

const SeedTable = async () => {
  const exists = await seeder.hasTable();

  if (exists) {
    await seeder.seed(seedData);
  }
};

exports.CreateTable = CreateTable;
exports.CleanupTable = CleanupTable;
exports.SeedTable = SeedTable;
exports.BookList = seedData;