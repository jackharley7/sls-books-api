require('../config/envConfig').bootstrap();
const { DynamoDB } = require('aws-sdk');
const { DocumentClient } = DynamoDB;

const dynamo = new DynamoDB({
  endpoint: process.env.LOCAL_AWS_ENDPOINT,
  region: process.env.LOCAL_AWS_REGION,
  accessKeyId: 'fake-access-key-id',
  secretAccessKey: 'fake-secret-access-key'
});

class Seeder {
  constructor(tableName) {
    this.dynamodb = dynamo;
    this.docClient = new DocumentClient({ service: dynamo });;
    this._tablename = tableName;
  }

  async hasTable() {
    const tables = await this.dynamodb.listTables({ Limit: 5 }).promise();
    return tables.TableNames && tables.TableNames.indexOf(this._tablename) >= 0;
  }

  async createTable() {
    const tableParams = {
      TableName: this._tablename,
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      }
    };

    const result = await this.dynamodb.createTable(tableParams).promise();

    return !!result.$response.error;
  }

  async deleteTable() {
    const result = await this.dynamodb.deleteTable({ TableName: this._tablename }).promise();

    return !!result.$response.err
  }

  seed(items = []) {
    const putRequests = items.map(b => ({
      PutRequest: {
        Item: Object.assign({}, b)
      }
    }));

    const params = {
      RequestItems: {
        [this._tablename]: putRequests
      }
    };

    return this.docClient.batchWrite(params).promise();
  }
}

exports.Seeder = Seeder;