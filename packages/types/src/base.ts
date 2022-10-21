import { Transport } from './transport';

export interface BaseClientType<O extends BaseOptionsFieldsType = BaseOptionsFieldsType> {
  options: O;
  transport: Transport;
}

export interface BaseOptionsFieldsType {
  dsn?: string;
  vue?: any;
  react?: any;
}
