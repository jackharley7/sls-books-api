const { v4 } = require('uuid');
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

class BookRepository {

  get _tableName() {
    return 'books'
  }

  constructor() {
    let options = {};
    if (process.env.NODE_ENV == "local") {
      // needed for local development
      options = {
        endpoint: process.env.LOCAL_AWS_ENDPOINT,
        region: process.env.LOCAL_AWS_REGION,
        accessKeyId: process.env.LOCAL_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.LOCAL_AWS_SECRET_ACCESS_KEY
      };
    }
    this.docClient = new DocumentClient(options);
  }

  async list() {
    const params = this._newParamObject();
    const response = await this.docClient.scan(params).promise();

    return response.Items || [];
  }

  async get(id) {
    const params = this._newParamObject({ Key: { id } });
    const response = await this.docClient.get(params).promise();

    return response.Item;
  }

  async put(book) {
    if (!book.id) {
      book.id = v4();
    }
    const params = this._newParamObject({ Item: book });
    await this.docClient.put(params).promise();

    return book;
  }

  async delete(id) {
    const params = this._newParamObject({ Key: { id } });
    await this.docClient.delete(params).promise();

    return id;
  }

  _newParamObject(args = {}) {
    return Object.assign({}, {
      TableName: this._tableName
    }, args);
  }
}

exports.BookRepository = BookRepository;