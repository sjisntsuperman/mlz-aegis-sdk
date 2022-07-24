import { logger } from '@aegis-web-sdk/utils/logger';

// 限制请求的 buffer []
export function makeRequestBuff(limits: number) {
  const buffer = [] as any[];

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

export abstract class BaseTransport {
  constructor(options) {
    this._options = options;
  }

  send(envelope: any) {
    const { makeRequest, buffer = makeRequestBuff(100) } = this._options;
    const requestTask = () =>
      makeRequest(envelope).then(
        (response: any) => {
          if (response.statusCode != undefined && (response.statusCode < 200 || response.statusCode >= 300)) {
            logger.warn('fetch error');
          }
        },
        () => {
          logger.error('fetch failed');
        },
      );
    return buffer.add(requestTask);
  }

  public abstract captureException(): void;
}
