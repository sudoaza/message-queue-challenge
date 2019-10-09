// Implements server for user clients.
// Registers the client id and notifies client of events.

const UserClient = require('./user_client');
const TextServer = require('./text_server');

class UserServer extends TextServer {
  constructor(port = 9099) {
    super(port, UserClient);
    this.registered = {};
    this.registeredIds = new Set();
  }

  registerClient(user) {
    this.registered[user.id] = user;
    this.registeredIds.add(user.id);
    // We now have the client indexed by id, remove from the list
    this.clients = this.clients.filter((v) => v.id != user.id);
  }

  unregisterClient(id) {
    delete this.registered[id];
    this.registeredIds.delete(id);
  }

  async broadcast(message) {
    this.registeredIds.forEach((k) => {
      this.notify(k, message);
    });
  }

  async notify(userId, message) {
    if (userId in this.registered) {
      this.registered[userId].notify(message);
    }
  }
}

module.exports = UserServer;
