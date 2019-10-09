const TextClient = require('../libs/text_client');
const Net = require('net');

// #constructor
const socket = new Net.Socket();
const client = new TextClient(socket);

test('should keep the socket', () => {
  expect(client.socket).toBe(socket);
});

test('should initialize unprocessedData to empty', () => {
  expect(client.unprocessedData).toBe('');
});

// #onData
test('should keep strings not finished by a new line', () => {
  client.onData('first');
  expect(client.unprocessedData).toBe('first');
  client.onData('\n');
  expect(client.unprocessedData).toBe('');
  client.onData('two\nrest');
  expect(client.unprocessedData).toBe('rest');
});
