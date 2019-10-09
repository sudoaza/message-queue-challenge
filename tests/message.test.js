const Message = require('../libs/message.js');

describe('#constructor', () => {
  const payload = '1|F|2|3';
  let message = new Message(payload);

  test('payload is unmodified', () => {
    expect(message.payload).toBe(payload);
  });

  test('sequence id is parsed ok', () => {
    expect(message.seq).toBe(1);
  });

  test('type is parsed ok', () => {
    expect(message.type).toBe('F');
  });

  test('from is parsed ok', () => {
    expect(message.from).toBe('2');
  });
  test('to is parsed ok', () => {
    expect(message.to).toBe('3');
  });
});