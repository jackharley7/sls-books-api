module.exports = {
  bootstrap: () => {
    process.env.LOCAL_AWS_ENDPOINT = 'http://localhost:8000';
    process.env.LOCAL_AWS_REGION = 'eu-west-2';
    process.env.LOCAL_AWS_ACCESS_KEY_ID = 'fake-key-id';
    process.env.LOCAL_AWS_SECRET_ACCESS_KEY = 'fake-key';
  }
};
