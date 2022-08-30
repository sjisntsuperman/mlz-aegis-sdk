import { logger } from '@aegis/utils/src';
import { TransportOptionsFieldsType } from '@aegis/types/src';

// 限制请求的 buffer []
export function makeRequestBuff(limits: number) {
  const buffer = [] as Promise<unknown>[];

  function remove(task: Promise<unknown>) {
    return buffer.splice(buffer.indexOf(task), 1);
  }

  function add(requestTask: Promise<unknown>) {
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

export class BaseTransport {
  _options: TransportOptionsFieldsType;
  constructor(options: TransportOptionsFieldsType) {
    this._options = options;
  }

  public send<T>(envelope: T): PromiseLike<void> {
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
}
