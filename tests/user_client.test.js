const UserClient = require('../libs/user_client');
const Net = require('net');

describe('#constructor', () => {
  let socket = new Net.Socket();
  let client = new UserClient(socket);

  test('should init id to  0', () => {
    expect(client.id).toBe(0);
  });  
});

describe('#onMessage', () => {
  let socket = new Net.Socket();
  let client = new UserClient(socket);
  let mockRegister = jest.fn((u) => {});
  socket.server = {registerClient: mockRegister};

  test('should set id if numeric message', () => {
    client.onMessage('1\n');
    expect(client.id).toBe(1);
  });

  test('should not set id if not numeric', () => {
    client.onMessage('test\n');
    expect(client.id).toBe(1);
  });
});

describe('#notify', () => {
  let socket = new Net.Socket();
  let mockWrite = jest.fn((m, e) => {});
  socket.write = mockWrite;
  let client = new UserClient(socket);
  let message = {payload: 'test'};

  test('should write to the socket', () => {
    client.notify(message);
    expect(mockWrite.mock.calls.length).toBe(1);
    expect(mockWrite.mock.calls[0][0]).toBe('test\n');
    expect(mockWrite.mock.calls[0][1]).toBe('UTF8');
  });
});

describe('#onEnd', () => {
  let socket = new Net.Socket();
  let client = new UserClient(socket);
  let mockUnregister = jest.fn((u) => {});
  let mockRegister = jest.fn((u) => {});
  socket.server = {registerClient: mockRegister, unregisterClient: mockUnregister};
  client.onMessage(1);

  test('should unregister user from server', () => {
    client.onEnd();
    expect(mockUnregister.mock.calls.length).toBe(1);
    expect(mockUnregister.mock.calls[0][0]).toBe(1);
  });
});