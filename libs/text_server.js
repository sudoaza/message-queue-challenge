// Base server, implements basic API

const Net = require('net');
const TextClient = require('./text_client');

class TextServer extends Net.Server {
  constructor(port = 9000, userClass = TextClient) {
    super();
    this.port = port;
    this.clients = [];
    this.onListen = this.defaultOnListen;
    this.userClass = userClass;
  }

  init() {
    this.listen(this.port, this.onListen);
    this.on('connection', this.onConnect.bind(this));
  }

  defaultOnListen() {
    console.log(`Server listening for connection requests on socket localhost:${this.port}`);
  }

  onConnect(socket) {
    console.log('A new connection has been established.');

    const client = new this.userClass(socket);
    this.clients.push(client);
  }
}

module.exports = TextServer;
