
const responseWithStatusCode = (code) => (data = null) => {
  const response = {
    statusCode: code
  };

  if (data) {
    response.body = JSON.stringify(data);
  }

  return response;
};

module.exports = {
  responseWithStatusCode
};