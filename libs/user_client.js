// Holds a token for clients representing users
// Register and Unregister users. Notify.

const TextClient = require('./text_client');

class UserClient extends TextClient {
  constructor(socket) {
    super(socket);
    this.id = 0;
  }

  onMessage(message) {
    this.id = parseInt(message, 10) || this.id;
    this.socket.server.registerClient(this);
  }

  notify(message) {
    this.socket.write(`${message.payload}\n`, 'UTF8');
  }

  onEnd() {
    this.socket.server.unregisterClient(this.id);
  }
}

module.exports = UserClient;
