// Holds a socket with a client.
// Processes incoming stream into messages.
// Allows interface for notifications.
// If message separation were to change you would change it here.

class TextClient {
  constructor(socket) {
    this.socket = socket;
    this.unprocessedData = '';

    this.socket.on('data', this.onData.bind(this));
    this.socket.on('end', this.onEnd.bind(this));
    this.socket.on('error', this.onError);
  }

  onMessage(message) {
    console.log('Override me TextClient.onMessage', message);
  }

  onData(chunk) {
    this.unprocessedData += chunk.toString();
    const messages = this.unprocessedData.split('\n');
    this.unprocessedData = messages.pop();
    messages.map((message) => {
      this.onMessage(message);
    });
  }

  onEnd() {
    console.log('Closing connection with the client');
  }

  onError(err) {
    console.log(`Error: ${err}`);
  }

  notify() {
    console.log('implement TextClient.notify');
  }
}

module.exports = TextClient;
