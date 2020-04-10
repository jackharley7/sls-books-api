require('../../config/envConfig').bootstrap();
const axios = require('axios');
const { CreateTable, CleanupTable, SeedTable, BookList } = require('./repository.util');

const assert = require('chai').assert;

describe('Books', () => {
  beforeEach(async() => {
    await CreateTable()
    await SeedTable()
  });

  describe('Delete book by id', () => {

    it('successfully deletes book by id', async () => {
      try {
        const response = await axios.post(`http://localhost:3000/dev/book/${BookList[0].id}/delete`);
        assert.equal(response.status, 204);
      } catch (err) {
        assert.fail("actual", "expected", err);
      }
    });

    it('returns 204 when book not found', async () => {
      try {
        const response = await axios.post(`http://localhost:3000/dev/book/123/delete`);
        assert.equal(response.status, 204);
      } catch (err) {
        assert.fail("actual", "expected", err);
      }
    });

  });

  afterEach(async () => {
    await CleanupTable()
  });
});
