const server = require('./config/server');
require('./config/database');
require('./config/routes')(server.server);
require('./config/socket')(server.app);