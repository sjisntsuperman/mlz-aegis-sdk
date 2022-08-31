import { BaseClientType, BaseHandlerType, BaseOptionsFieldsType, EventTypes } from '@aegis/types';
import { Transport } from '@aegis/types/src';
import { Subscribe } from './subscribe';

export type ClientOptions = {
  dsn: string;
  transport: () => void;
};

export abstract class BaseClient<
  O extends BaseOptionsFieldsType = BaseOptionsFieldsType,
  E extends EventTypes = EventTypes,
> implements BaseClientType
{
  public options: O;
  public transport: Transport = null as any;
  public dsn = '';

  constructor(options: O) {
    this.options = options;
    if (options.dsn) {
      this.dsn = options.dsn;
    }
  }

  use(handlers: BaseHandlerType<E>[]) {
    const sub = new Subscribe();
    handlers.forEach(handler => {
      handler.monitor.call(this, sub.notify.bind(sub));
      const wrapFn = (...args: any[]) => {
        const result = handler.transform?.call(this, args);
        handler.consumer?.call(this, result);
      };
      sub.watch(handler.name, wrapFn);
    });
  }
}
