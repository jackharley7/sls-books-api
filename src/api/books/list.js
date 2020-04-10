const { BookRepository } = require('../../storage/book.repository');
const { responseWithStatusCode } = require('../../helpers/response.utils');

const repository = new BookRepository();
const success = responseWithStatusCode(200, JSON.stringify);

exports.handler = async () => {
  const books = await repository.list();

  return success(books);
};