const UserServer = require('../libs/user_server');
const UserClient = require('../libs/user_client');


// #constructor
test('should keep the default port', () => {
  expect(new UserServer().port).toBe(9099);
});

test('should set the passed port', () => {
  expect(new UserServer(1234).port).toBe(1234);
});

test('should initialize userClass to UserClient', () => {
  expect(new UserServer().userClass).toBe(UserClient);
});

test('should initialize registered to empty object', () => {
  expect(Object.keys(new UserServer().registered).length).toBe(0);
});


// #registerClient
let server = new UserServer();
let user = {id: 1234};

test('should save the user in the registered list with it id as index', () => {
  server.registerClient(user);
  expect(server.registered[user.id].id).toBe(user.id);
  expect(server.registeredIds).toContain(user.id);
});

// #unregisterClient
test('should remove the user from the registered lists', () => {
  server.unregisterClient(user.id);
  expect(server.registered[user.id]).toBeUndefined();
  expect(server.registeredIds).not.toContain(user.id);
});


// #broadcast
test('should notify all the registered clients', async (done) => {
  server = new UserServer();

  let mockNotify = jest.fn((m) => {
    done();
  });
  let user = {id: 101, notify: mockNotify};
  let user2 = {id: 202, notify: mockNotify};
  let message = {};
  
  server.registerClient(user);
  server.registerClient(user2);
  await server.broadcast(message);
  expect(mockNotify.mock.calls.length).toBe(2);
  expect(mockNotify.mock.calls[0][0]).toBe(message);
  expect(mockNotify.mock.calls[1][0]).toBe(message);
});

// #notify
test('should notify this user and no other', async (done) => {
  server = new UserServer();

  let mockNotify = jest.fn((m) => {
    done();
  });
  let user = {id: 101, notify: mockNotify};
  let user2 = {id: 202, notify: mockNotify};
  let message = {};
  
  server.registerClient(user);
  server.registerClient(user2);
  await server.notify(user.id, message);
  expect(mockNotify.mock.calls.length).toBe(1);
  expect(mockNotify.mock.calls[0][0]).toBe(message);
});