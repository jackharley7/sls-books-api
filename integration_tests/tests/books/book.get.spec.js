require('../../config/envConfig').bootstrap();
const axios = require('axios');
const { CreateTable, CleanupTable, SeedTable, BookList } = require('./repository.util');

const assert = require('chai').assert;

describe('Books', () => {
  beforeEach(async() => {
    await CreateTable()
    await SeedTable()
  });

  describe('Get book by id', () => {

    it('successfully gets book by id', async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dev/book/${BookList[0].id}`);
        assert.deepEqual(response.data, BookList[0]);
      } catch (err) {
        assert.fail("actual", "expected", err);
      }
    });

    it('returns 404 when book not found', async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dev/book/123`);
        assert.fail("actual", "expected", response.status);
      } catch (err) {
        assert.equal(err.response.status, 404);
      }
    });

  });

  afterEach(async () => {
    await CleanupTable()
  });
});
