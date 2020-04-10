const { BookRepository } = require('../../storage/book.repository');
const { responseWithStatusCode } = require('../../helpers/response.utils');

const repository = new BookRepository();
const success = responseWithStatusCode(200);
const notFound = responseWithStatusCode(404);

exports.handler = async (event) => {
  const { body, pathParameters } = event;
  const { id } = pathParameters;

  const existingBook = await repository.get(id);
  const book = JSON.parse(body);

  if (!existingBook) {
    return notFound();
  }

  const updatedBook = await repository.put(book);

  return success(updatedBook);
};