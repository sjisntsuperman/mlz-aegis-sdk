import { BaseClient } from '../../src';

export interface TestClientOptionsFields {
  dsn?: string;
}

export class TestClient extends BaseClient {
  constructor(options: TestClientOptionsFields) {
    super(options);
    this.options = {
      ...options,
    };
  }
}
