import { Transport } from './transport';

export interface BaseClientType<O extends BaseOptionsFieldsType = BaseOptionsFieldsType> {
  options: O;
  transport: Transport;
}

export interface BaseOptionsFieldsType {
  dsn?: string;
}

export interface EnvelopeItem {
  url: string;
  data?: any;
}
