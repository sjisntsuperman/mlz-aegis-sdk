import { EnvelopeItem } from './';

export interface TransportOptionsFieldsType {
  dsn: string;
  url?: string;
  headers?: any;
  makeRequest: (envelope: any) => PromiseLike<TransportMakeRequestResponse>;
  requestBuffer?: any;
}

export interface TransportRequest {
  // body: string | Uint8Array;
  envelope: EnvelopeItem;
}

export type TransportMakeRequestResponse = {
  statusCode?: number;
  headers?: any;
};

export interface Transport {
  send(envelope: EnvelopeItem): PromiseLike<void>;
}

// export type TransportReponseExecutor = (request: TransportRequest) => PromiseLike<TransportMakeRequestResponse>;
