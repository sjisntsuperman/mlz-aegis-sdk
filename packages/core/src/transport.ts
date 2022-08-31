import { logger } from '@aegis/utils/src';
import { EnvelopeItem, TransportOptionsFieldsType } from '@aegis/types/src';
import { Transport } from '@aegis/types';

// 限制请求的 buffer []
export function makeRequestBuff(limits: number) {
  const buffer = [] as PromiseLike<unknown>[];

  function isReady(): boolean {
    return buffer.length < limits;
  }

  function remove(task: Promise<unknown>) {
    return buffer.splice(buffer.indexOf(task), 1);
  }

  function add<T = unknown>(requestTask: Promise<T>): PromiseLike<unknown> {
    if (!isReady()) {
      return new Promise(resolve => resolve(new Error('over rate limits.')));
    }
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

export class BaseTransport<O extends TransportOptionsFieldsType = TransportOptionsFieldsType> implements Transport {
  options: O;
  constructor(options: O) {
    this.options = options;
  }

  public send<T>(envelope: EnvelopeItem): PromiseLike<T> {
    const { makeRequest, buffer = makeRequestBuff(100) } = this.options;

    // function decodeEnvelope(envelope: EnvelopeItem): string {
    //   return envelope.url;
    // }

    const requestTask = () =>
      makeRequest(envelope).then(
        response => {
          if (response.statusCode != undefined && (response.statusCode < 200 || response.statusCode >= 300)) {
            logger.warn('fetch error');
          }
        },
        error => {
          logger.error('fetch failed', error);
        },
      );
    return buffer.add(requestTask);
  }
}
