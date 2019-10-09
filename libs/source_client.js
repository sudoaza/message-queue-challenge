// Holds a socket to the source of messages

const TextClient = require('./text_client');

class SourceClient extends TextClient {
  onMessage(message) {
    this.socket.server.onMessage(message);
  }
}

module.exports = SourceClient;
