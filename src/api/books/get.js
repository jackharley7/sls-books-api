
const { BookRepository } = require('../../storage/book.repository');
const { responseWithStatusCode } = require('../../helpers/response.utils');

const repository = new BookRepository();
const success = responseWithStatusCode(200, JSON.stringify);
const notFound = responseWithStatusCode(404);

exports.handler = async (event) => {
  const { id } = event.pathParameters;
  const book = await repository.get(id);

  if (!book){
    return notFound();
  }

  return success(book);
};