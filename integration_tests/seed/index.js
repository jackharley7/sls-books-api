const { Seeder } = require('./seeder');
const seedData = require('./books.seed.json');

const seeder = new Seeder('books');

const seedBooks = async () => {
  const exists = await seeder.hasTable();

  if (exists) {
    await seeder.deleteTable();
  }

  await seeder.createTable();

  await seeder.seed(seedData);
};

seedBooks()
  .then(() => console.log('Done!'))
  .catch(err => console.log(err));