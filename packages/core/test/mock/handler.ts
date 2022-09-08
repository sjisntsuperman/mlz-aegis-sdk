import { BaseHandlerType } from '@aegis/types';

export const testHandler: BaseHandlerType = {
  name: 'test',
  monitor(notify) {
    const testData = {
      message: 'test message',
    };
    notify('testEvent', testData);
  },
  transform(collectedData) {
    return collectedData;
  },
  consumer(transformedData) {
    this.transport.send(transformedData);
  },
};
