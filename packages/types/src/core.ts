export interface BaseClientType<O extends BaseOptionsFieldsType = BaseOptionsFieldsType> {
  options: O;
  transport: any;
}

export interface BaseOptionsFieldsType {
  dsn?: string;
}

export interface TransportOptionsFieldsType {
  dsn: string;
  makeRequest: (envelope: unknown) => PromiseLike<unknown>;
  buffer?: any;
}
