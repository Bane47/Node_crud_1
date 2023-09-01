function notFound(message) {
    const error = new Error(message);  
    error.statusCode = 404;
    return error;
  }
  
  function serverError(message) {
    const error = new Error(message);
    error.statusCode = 500; 
    return error;
  }
  
  function badGateway(message) {
    const error = new Error(message);
    error.statusCode = 502;
    return error; 
  }
  
  module.exports = {
    notFound,
    serverError,
    badGateway,
  };
  