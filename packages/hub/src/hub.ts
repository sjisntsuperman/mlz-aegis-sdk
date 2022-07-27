import { getGlobalObject, uuid4 } from '@aegis-web-sdk/utils';
import { EventHint } from '@aegis-web-sdk/types';

export type HubOptions = {
  clients: any[];
};

export function getCurrentHub() {
  const global = getGlobalObject();
  if (!global.AEGIS) {
    global.AEGIS = new Hub();
  }
  return global.AEGIS;
}

export class Hub {
  public clients: any[] = [];
  public lastEventId: string | undefined;

  getClient() {
    return this.clients[this.clients.length - 1];
  }

  bindClient(client) {
    this.clients.push(client);
  }

  captureException(exception: any, hint: EventHint) {
    const eventId = (hint && (this.lastEventId = hint.eventId)) || uuid4();
    this.clients.forEach(item => {
      return item.captureException(exception, {
        originalException: exception,
        ...hint,
        eventId,
      });
    });
    return eventId;
  }
}
