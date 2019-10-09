const SourceServer = require('../libs/source_server');

describe('constructor', () => {
  const server = new SourceServer();

  test('source client is false', () => {
    expect(server.source).toBeFalsy();
  });
  test('queue is empty object', () => {
    expect(server.queue).toEqual({});
  });
  test('sequence is 0', () => {
    expect(server.seq).toBe(0);
  });
  test('followers is empty object', () => {
    expect(server.followers).toEqual({});
  });
});

describe('processMessage', () => {
  const server = new SourceServer();
  server.follow = jest.fn((m) => {});
  server.unfollow = jest.fn((m) => {});
  server.broadcast = jest.fn((m) => {});
  server.privateMessage = jest.fn((m) => {});
  server.statusUpdate = jest.fn((m) => {});

  test('follow message', () => {
    const message = {type: 'F'}
    expect(server.follow.mock.calls.length).toBe(0);
    server.processMessage(message);
    expect(server.follow.mock.calls.length).toBe(1);
  });
  test('unfollow message', () => {
    const message = {type: 'U'}
    expect(server.unfollow.mock.calls.length).toBe(0);
    server.processMessage(message);
    expect(server.unfollow.mock.calls.length).toBe(1);
  });
  test('broadcast message', () => {
    const message = {type: 'B'}
    expect(server.broadcast.mock.calls.length).toBe(0);
    server.processMessage(message);
    expect(server.broadcast.mock.calls.length).toBe(1);
  });
  test('private message', () => {
    const message = {type: 'P'}
    expect(server.privateMessage.mock.calls.length).toBe(0);
    server.processMessage(message);
    expect(server.privateMessage.mock.calls.length).toBe(1);
  });
  test('status update', () => {
    const message = {type: 'S'}
    expect(server.statusUpdate.mock.calls.length).toBe(0);
    server.processMessage(message);
    expect(server.statusUpdate.mock.calls.length).toBe(1);
  });
});