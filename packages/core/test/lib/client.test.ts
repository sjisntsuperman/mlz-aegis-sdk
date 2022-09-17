import { BaseClient } from '../../src';
import { TestClient } from '../mock/client';
import { testHandler } from '../mock/handler';

describe('Client', () => {
  describe('constructor', () => {
    const client = new TestClient({
      dsn: 'http://xxx.com',
    });
    expect(client instanceof BaseClient).toBe(true);
  });
  describe('use plugins', () => {
    const client = new TestClient({
      dsn: 'http://xxx.com',
    });

    client.use([testHandler]);

    // todo: get mock reponse
    const response = {
      message: 'test message',
    };

    expect(response.message).toBe('test message');
  });
});
