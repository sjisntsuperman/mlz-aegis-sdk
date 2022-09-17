import { BaseHandlerType } from '@aegis/types';

export const testHandler: BaseHandlerType = {
  name: 'test',
  monitor(notify) {
    const testData = {
      message: 'test message',
    };
    // mock async task
    setTimeout(function () {
      notify('testEvent', testData);
    }, 500);
  },
  transform(collectedData) {
    return collectedData;
  },
  consumer(transformedData) {
    this.transport.send(transformedData);
  },
};
