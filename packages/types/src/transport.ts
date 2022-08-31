import { EnvelopeItem } from './base';

export interface TransportOptionsFieldsType {
  dsn: string;
  makeRequest: (envelope: EnvelopeItem) => PromiseLike<TransportMakeRequestResponse>;
  buffer?: PromiseLike<unknown>[];
}

export interface TransportRequest {
  // body: string | Uint8Array;
  envelope: EnvelopeItem;
}

export type TransportMakeRequestResponse = {
  statusCode?: number;
};

export interface Transport {
  send(envelope: EnvelopeItem): PromiseLike<void>;
}

// export type TransportReponseExecutor = (request: TransportRequest) => PromiseLike<TransportMakeRequestResponse>;
