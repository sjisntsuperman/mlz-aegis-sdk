import { logger } from 'aegis-sdk/utils';

export function makeRequestBuff(limits) {
  const buffer = [];

  function remove(task) {
    return buffer.splice(buffer.indexOf(task), 1);
  }

  function add(requestTask) {
    const task = requestTask;
    const taskIdx = buffer.indexOf(task);
    if (taskIdx == -1) {
      buffer.push(requestTask);
    }
    return requestTask.then(() => remove(task)).then(null, () => remove(task));
  }
  return {
    buffer,
    add,
  };
}

export function createTransport(options, makeRequest, buffer = makeRequestBuff(100)) {
  function send(envelope) {
    const requestTask = () =>
      makeRequest(envelope).then(
        response => {
          if (response.statusCode != undefined && (response.statusCode < 200 || response.statusCode >= 300)) {
            logger.warn('fetch error');
          }
        },
        error => {
          logger.error('fetch failed');
        },
      );
    return buffer.add(requestTask);
  }

  return {
    send,
  };
}
