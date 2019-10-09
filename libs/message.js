// Implements the message model. Parses the string into and object.
// If message formay were to change you would change it here.

class Message {
  constructor(messageStr) {
    const pieces = messageStr.split('|');
    this.payload = messageStr || '';
    this.seq = parseInt(pieces[0], 10) || 0;
    this.type = pieces[1] || '';
    this.from = pieces[2] || 0;
    this.to = pieces[3] || 0;
  }
}

module.exports = Message;
