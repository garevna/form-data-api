const messages = {
  500: () => 'Database was corrupted or it doesn\'t exist',
  404: () => 'There is no requested data in database',
  470: () => 'Invalid or missing Content-Type header',
  475: data => `${data} allready exist`,
  480: data => `There is no requested data: ${data}`,
  500: () => 'Unknown Server Error',
  501: method => `The request method ${method} is not supported by the server and cannot be handled.`
}

module.exports = function getError (errCode, data) {
  return  {
    error: errCode,
    message: messages[errCode](data) || ''
  }
}
