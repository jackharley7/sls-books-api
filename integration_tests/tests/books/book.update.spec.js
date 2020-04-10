require('../../config/envConfig').bootstrap();
const axios = require('axios');
const { CreateTable, CleanupTable, SeedTable, BookList } = require('./repository.util');

const assert = require('chai').assert;

describe('Books', () => {
  beforeEach(async() => {
    await CreateTable()
    await SeedTable()
  });

  describe('Update all book', () => {

    it('successfully updates a book', async () => {
      const updates = {...BookList[0]};
      updates.name = "new book name"

      try {
        const response = await axios.post(`http://localhost:3000/dev/book/${BookList[0].id}/update`, updates);
        assert.deepEqual(response.data, updates);
      } catch (err) {
        assert.fail("actual", "expected", err);
      }
    });

    it('returns 404 when book not found', async () => {
      const updates = {...BookList[0]};
      updates.name = "new book name"
      updates.id = "123"
      try {
        const response = await axios.post(`http://localhost:3000/dev/book/${updates.id}/update`, updates);
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
