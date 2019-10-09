const UserServer = require('./libs/user_server');
const SourceServer = require('./libs/source_server');

const userServer = new UserServer();
userServer.init();

const sourceServer = new SourceServer(userServer);
sourceServer.init();
