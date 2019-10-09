// Implements server for user clients.
// Registers the client id and notifies client of events.

const SourceClient = require('./source_client');
const TextServer = require('./text_server');
const Message = require('./message');

class SourceServer extends TextServer {
  constructor(userServer, port = 9090) {
    super(port, SourceClient);
    this.source = false;
    this.queue = {};
    this.seq = 0;
    this.userServer = userServer;
    this.followers = {};
  }

  registerClient(source) {
    this.source = source;
  }

  onMessage(message) {
    const parsedMessage = new Message(message);
    if (this.isNextMessage(parsedMessage)) {
      this.processMessage(parsedMessage);
    } else {
      this.enqueueMessage(parsedMessage);
    }
    this.processQueue();
  }

  isNextMessage(message) {
    return this.seq + 1 === message.seq;
  }

  // Process an individual message, executing whatever appropiate action and notify
  // appropiate clients. After that process messages in the delayed queue if needed.
  processMessage(message) {
    this.seq++;
    // console.log(message);
    switch (message.type) {
      case 'F':
        this.follow(message);
        break;
      case 'U':
        this.unfollow(message);
        break;
      case 'B':
        this.broadcast(message);
        break;
      case 'P':
        this.privateMessage(message);
        break;
      case 'S':
        this.statusUpdate(message);
        break;
      default:
        console.log('Unknown message type', message.type);
    }
  }

  enqueueMessage(message) {
    this.queue[message.seq] = message;
  }

  // Process messages that arrived out of order
  processQueue() {
    while ((this.seq + 1) in this.queue) {
      this.processMessage(this.queue[this.seq + 1]);
      // this.seq is increased inside processMessage
      delete this.queue[this.seq];
    }
  }

  follow(message) {
    if (!(message.to in this.followers)) {
      this.followers[message.to] = new Set();
    }
    this.followers[message.to].add(message.from);
    this.userServer.notify(message.to, message);
  }

  unfollow(message) {
    if (message.to in this.followers) {
      this.followers[message.to].delete(message.from);
    }
    if (this.followers[message.to].size === 0) {
      delete this.followers[message.to];
    }
  }

  broadcast(message) {
    this.userServer.broadcast(message);
  }

  privateMessage(message) {
    this.userServer.notify(message.to, message);
  }

  statusUpdate(message) {
    if (message.from in this.followers) {
      this.followers[message.from].forEach((followerId) => {
        this.userServer.notify(followerId, message);
      });
    }
  }
}

module.exports = SourceServer;
