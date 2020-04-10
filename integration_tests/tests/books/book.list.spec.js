require('../../config/envConfig').bootstrap();
const axios = require('axios');
const { CreateTable, CleanupTable, SeedTable, BookList } = require('./repository.util');

const assert = require('chai').assert;

describe('Books', () => {
  beforeEach(async() => {
    await CreateTable()
    await SeedTable()
  });

  describe('List all books', () => {

    it('successfully list books', async () => {
      try {
        const response = await axios.get("http://localhost:3000/dev/books");
        assert.deepEqual(response.data, BookList);
      } catch (err) {
        assert.fail("actual", "expected", err);
      }
    });

  });

  afterEach(async () => {
    await CleanupTable()
  });
});
