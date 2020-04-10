const { BookRepository } = require('../../storage/book.repository');
const { responseWithStatusCode } = require('../../helpers/response.utils');

const repository = new BookRepository();
const created = responseWithStatusCode(201);

exports.handler = async (event) => {
  const { body } = event;
  const book = JSON.parse(body);

  createdBook = await repository.put(book);

  return created(createdBook);
};