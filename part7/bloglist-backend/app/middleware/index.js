const errorHandler = require('./errorHandler.middleware');
const unknownRouteHandler = require('./unknownRouteHandler.middleware');

module.exports = { errorHandler, unknownRouteHandler };
