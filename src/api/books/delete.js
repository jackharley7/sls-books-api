const { BookRepository } = require('../../storage/book.repository');
const { responseWithStatusCode } = require('../../helpers/response.utils');

const repository = new BookRepository();
const noContent = responseWithStatusCode(204);

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  await repository.delete(id);

  return noContent();
};