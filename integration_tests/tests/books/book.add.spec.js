require('../../config/envConfig').bootstrap();
const axios = require('axios');
const { CreateTable, CleanupTable } = require('./repository.util');

const assert = require('chai').assert;

describe('Books', () => {
  beforeEach(async() => {
    await CreateTable()
  });

  describe('Add a book', () => {

    it('successfully save a book', async () => {
      const book = {
        name: "book1",
        releaseDate: 123456789,
        authorName: "author1"  
      };
      try {
        const response = await axios.post("http://localhost:3000/dev/book/add", book);
        assert.isString(response.data.id)
        assert.equal(response.data.name, book.name);
        assert.equal(response.data.releaseDate, book.releaseDate);
        assert.equal(response.data.authorName, book.authorName);
      } catch (err) {
        assert.fail("actual", "expected", err);
      }
    });

  });

  afterEach(async () => {
    await CleanupTable()
  });
});
